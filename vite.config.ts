import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      mode === "analyze" &&
        (visualizer({
          open: true,
        }) as PluginOption),
    ],
    resolve: {
      alias: {
        // Alias 'src' to the absolute path of your src directory
        src: path.resolve(__dirname, "./src"),
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
  };
});
