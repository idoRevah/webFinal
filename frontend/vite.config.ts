// @ts-nocheck
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path"; // Use node:path for ESM compatibility
import { fileURLToPath } from "url"; // Fix __dirname issue in ESM

// Manually define __dirname for Vite
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  plugins: [react()],
  css: {
    postcss: "./postcss.config.ts",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Fix __dirname issue
    },
  },
});
