import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/

export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target:
          "https://6xszmurh3c.execute-api.ap-south-1.amazonaws.com/dev/api/v1",
        changeOrigin: true,
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
