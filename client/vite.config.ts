import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
const API_BASE_URL = process.env.VITE_API_BASE_URL;

export default defineConfig(({ mode }) => ({
  server: {
    proxy:
      mode === "development"
        ? {
            "/api/v1": {
              target: API_BASE_URL,
              changeOrigin: true,
              secure: true,
            },
          }
        : undefined,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
