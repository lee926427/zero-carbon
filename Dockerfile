# syntax=docker/dockerfile:1

# ---- base: Vite+ toolchain image, with project-wide install setup ----
FROM ghcr.io/voidzero-dev/vite-plus:latest AS base
WORKDIR /app
# git: needed for `vp config` (project's "prepare" script) to run without
# erroring; it gracefully no-ops when it finds no .git repo (.dockerignore
# excludes .git from the build context anyway), it just needs the binary
# present to get that far. The toolchain image's `vp` user has passwordless
# sudo, so this works without switching the image user.
RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends git \
  && sudo rm -rf /var/lib/apt/lists/*
# Copied here (once, shared by both the build and deps stages below) rather
# than after — `vp pm` only knows this project uses pnpm once package.json
# is present; without it, `vp pm` falls back to npm.
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
# pnpm's built-in minimum-release-age supply-chain guard rejects packages
# published too recently. Several deps here are pinned to "latest" and get
# same-day releases, so a non-zero cutoff makes installs non-reproducible.
# This has to be user-level config, not a committed .npmrc — pnpm
# deliberately ignores project-level .npmrc for this setting (a compromised
# lockfile PR could just as easily disable the check that would catch it).
# Routed through `vp pm` rather than calling pnpm directly so it lands on
# the same pnpm binary `vp install`/`vp build` actually use.
RUN vp pm config set minimum-release-age 0

# ---- build: full deps (incl. devDependencies, needed for vp/vite/stylex etc.) ----
FROM base AS build
RUN vp install --frozen-lockfile
COPY --chown=vp:vp . .
# Vite inlines VITE_* env vars into the client bundle at build time (same
# idea as Next's NEXT_PUBLIC_*), so these have to be available before `vp
# build` runs, not just at container runtime.
ARG VITE_BUCKET_ENDPOINT
ARG VITE_GTM_ID
ENV VITE_BUCKET_ENDPOINT=$VITE_BUCKET_ENDPOINT
ENV VITE_GTM_ID=$VITE_GTM_ID
RUN vp build
# Export the exact resolved Node.js binary (matches .node-version) for the
# runtime stage, so the deployed image needs no Node-version-specific tag.
RUN cp "$(vp env which node | head -1)" /tmp/node

# ---- deps: production-only dependencies, installed fresh ----
# A separate, fresh `--prod` install so devDependencies (including the
# vite-plus toolchain) are excluded. Running `--prod` over the full install
# in the `build` stage would not prune the already-installed devDependencies.
FROM base AS deps
RUN vp install --frozen-lockfile --prod

# ---- runtime: small, glibc, no vp ----
FROM debian:bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

# ca-certificates: the server fetches the bucket endpoint (VITE_BUCKET_ENDPOINT)
# over HTTPS during SSR route loaders at request time; debian:bookworm-slim
# doesn't ship a CA bundle like node:slim images do.
# libatomic1: the official Node.js Linux build dynamically links against
# libatomic.so.1, which node:slim images bundle but bare debian:bookworm-slim
# doesn't; node exits with "error while loading shared libraries" without it.
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates libatomic1 \
  && rm -rf /var/lib/apt/lists/*

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nodejs

# The exact Node.js from .node-version (official, signature-verified build).
COPY --from=build /tmp/node /usr/local/bin/node

COPY --from=build --chown=nodejs:nodejs /app/dist ./dist
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nodejs:nodejs /app/package.json ./

EXPOSE 3000
USER nodejs

# Invoke srvx's entry file directly instead of `npm start` — this runtime
# image has no npm, only the single Node.js binary copied in above.
CMD ["node", "node_modules/srvx/bin/srvx.mjs", "serve", "--prod", "--static", "../client", "--entry", "dist/server/server.js"]
