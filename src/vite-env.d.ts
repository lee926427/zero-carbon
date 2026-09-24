/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUCKET_ENDPOINT: string;
}

declare module "virtual:stylex:runtime" {}
declare module "virtual:stylex:css-only" {}
