import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
// const API_BASE_URL = process.env.VITE_API_BASE_URL;

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://n5cm79p6wa.execute-api.ap-south-1.amazonaws.com/dev",
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
