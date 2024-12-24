import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
const API_BASE_URL = process.env.VITE_API_BASE_URL;

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: API_BASE_URL,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
