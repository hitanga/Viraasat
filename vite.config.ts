import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

// A custom plugin to resolve firebase-applet-config.json to a fallback if missing (e.g., on Vercel/CI builds)
function firebaseConfigResolver() {
  return {
    name: 'firebase-config-resolver',
    resolveId(source: string) {
      if (source.includes('firebase-applet-config.json')) {
        const fullPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
        if (!fs.existsSync(fullPath)) {
          return '\0virtual:firebase-applet-config.json';
        }
      }
      return null;
    },
    load(id: string) {
      if (id === '\0virtual:firebase-applet-config.json') {
        const fallback = {
          apiKey: "",
          authDomain: "",
          projectId: "",
          storageBucket: "",
          messagingSenderId: "",
          appId: "",
          firestoreDatabaseId: ""
        };
        return `export default ${JSON.stringify(fallback)};`;
      }
      return null;
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), firebaseConfigResolver()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
