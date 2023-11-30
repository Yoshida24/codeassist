import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp", // need to use WebContainer
      "Cross-Origin-Opener-Policy": "same-origin", // need to use WebContainer
    },
  },
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: "eslint --ext .tsx,.ts,.jsx,.js .",
      },
    }),
  ],
});
