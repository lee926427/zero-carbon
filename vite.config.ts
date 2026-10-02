import path from "node:path";

import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import stylex from "@stylexjs/unplugin";
import { type UserConfig, defineConfig } from "vite-plus";

const rootDir = process.cwd();

const lint: UserConfig["lint"] = {
  plugins: ["oxc", "typescript", "unicorn", "react", "import"],
  categories: {
    correctness: "warn",
  },
  options: {
    typeAware: true,
    typeCheck: true,
  },
  env: {
    builtin: true,
  },
  rules: {
    "sort-imports": ["warn", { ignoreDeclarationSort: true }],
  },
  ignorePatterns: [
    "**/.nx/**",
    "**/.svelte-kit/**",
    "**/build/**",
    "**/coverage/**",
    "**/dist/**",
    "**/snap/**",
    "**/vite.config.*.timestamp-*.*",
    "eslint.config.js",
    "prettier.config.js",
  ],
};

const fmt: UserConfig["fmt"] = {
  semi: false,
  singleQuote: true,
  trailingComma: "all",
  printWidth: 80,
  sortImports: {
    groups: [
      "builtin",
      "external",
      ["internal", "subpath"],
      ["parent", "sibling", "index"],
      "style",
      "unknown",
    ],
  },
  sortPackageJson: false,
  disableNestedConfig: true,
  ignorePatterns: ["package-lock.json", "pnpm-lock.yaml", "yarn.lock", "src/routeTree.gen.ts"],
};

const config = defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint,
  fmt,
  resolve: { tsconfigPaths: true },
  plugins: [
    stylex.vite({
      useCSSLayers: true,
      dev: process.env.NODE_ENV === "development",
      runtimeInjection: false,
      // The installed @stylexjs/unplugin@0.19.0 doesn't infer devMode from
      // runtimeInjection: false the way the docs' example implies — without
      // this, virtual:stylex:css-only fails to resolve (its resolveId hook
      // only recognizes that specifier when devMode is 'css-only').
      devMode: "css-only",
      aliases: {
        "@/*": [path.join(rootDir, "src/*")],
      },
    }),
    devtools(),
    tanstackStart({
      prerender: {
        enabled: true,
      },
    }),
    viteReact(),
  ],
});

export default config;
