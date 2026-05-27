import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/axe-con-2026/",
  plugins: [react()],
  server: {
    // Bind to all interfaces so the axe-mcp-server Docker container can
    // reach the dev server via the host gateway (host.docker.internal).
    host: true,
  },
});
