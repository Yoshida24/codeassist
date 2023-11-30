/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MICROCMS_SERVICE: string;
  readonly VITE_MICROCMS_KEY: string;
  readonly VITE_OPENAI_KEY: string;
  readonly VITE_OPENAI_DEFAULT_MODEL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
