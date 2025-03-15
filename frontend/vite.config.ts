import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    hmr: {
      overlay: true, // Show errors in the browser
    },
    watch: {
      ignored: ["**/node_modules/**", "**/dist/**"], // Ignore heavy folders
      usePolling: true,
    },
  },
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        strict: false,
        skipLibCheck: true,
      },
    },
  },
  plugins: [react()],
  css: {
    postcss: "./postcss.config.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
