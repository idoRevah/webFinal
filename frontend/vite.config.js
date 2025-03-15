"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
var path_1 = require("path");
// https://vite.dev/config/
exports.default = (0, vite_1.defineConfig)({
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
            },
        },
    },
    plugins: [(0, plugin_react_1.default)()],
    css: {
        postcss: "./postcss.config.ts",
    },
    resolve: {
        alias: {
            "@": path_1.default.resolve(__dirname, "./src"),
        },
    },
});
