import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import PrintUrlsPlugin from "vite-plugin-print-urls";
import tsconfigPaths from "vite-tsconfig-paths";
import VitePluginBrowserSync from "vite-plugin-browser-sync";

export default defineConfig({
  plugins: [
    solidPlugin(),
    PrintUrlsPlugin(),
    tsconfigPaths(),
    VitePluginBrowserSync(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
