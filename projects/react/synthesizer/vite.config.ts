import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/projects/synthesizer/',
  plugins: [react()],
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
});
