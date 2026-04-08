import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/projects/breathing-bubble/",
  plugins: [react()],
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
});
