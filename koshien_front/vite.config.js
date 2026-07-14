import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 【追記】pdfjs-distの依存関係を正常に処理させるための設定
  optimizeDeps: {
    esbuildOptions: {
      target: "es2022", // 最新のJS構文を許可する
    },
  },
});
