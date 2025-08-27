import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"), // Alias 'src' to the absolute path of your src directory
    },
  },
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // Default vendor chunk for other node_modules
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    port: 3000,
  },
  base: "/react.mista/",
});
