import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { readFile } from "node:fs/promises";
import path from "node:path";

function legacyProjectsStaticPlugin() {
  const rootDir = fileURLToPath(new URL(".", import.meta.url));
  const mimeTypes = new Map([
    [".css", "text/css; charset=utf-8"],
    [".html", "text/html; charset=utf-8"],
    [".ico", "image/x-icon"],
    [".js", "text/javascript; charset=utf-8"],
    [".json", "application/json; charset=utf-8"],
    [".map", "application/json; charset=utf-8"],
    [".svg", "image/svg+xml"],
    [".txt", "text/plain; charset=utf-8"],
    [".woff", "font/woff"],
    [".woff2", "font/woff2"],
  ]);

  return {
    configureServer(server: { middlewares: { use: (handler: (req: { url?: string }, res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body?: Buffer | string) => void }, next: () => void) => void) => void } }) {
      server.middlewares.use(async (req, res, next) => {
        const requestUrl = req.url;

        if (!requestUrl?.startsWith("/projects/")) {
          next();
          return;
        }

        const cleanPath = requestUrl.split("?")[0];
        const filePath = path.resolve(rootDir, `.${cleanPath}`);

        if (!filePath.startsWith(path.resolve(rootDir, "projects"))) {
          next();
          return;
        }

        try {
          const body = await readFile(filePath);
          const ext = path.extname(filePath);

          res.statusCode = 200;
          res.setHeader("Content-Type", mimeTypes.get(ext) ?? "application/octet-stream");
          res.end(body);
        } catch {
          next();
        }
      });
    },
    name: "legacy-projects-static",
  };
}

export default defineConfig({
  base: "./",
  plugins: [legacyProjectsStaticPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
