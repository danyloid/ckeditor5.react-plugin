import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const { VITE_BASE_URL } = env;

  console.info("VITE_BASE_URL", VITE_BASE_URL);

  return {
    base: VITE_BASE_URL ? `/${VITE_BASE_URL}/` : undefined,
    plugins: [
      react(),
      ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
    ],
  };
});
