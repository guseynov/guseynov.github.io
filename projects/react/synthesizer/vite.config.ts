import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/projects/react/synthesizer/build/',
  plugins: [react()],
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
});
