import fs from 'fs';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

function syncRootLogo() {
  const rootDir = import.meta.dirname;
  const publicDir = path.resolve(rootDir, 'public');
  const rootLogo = path.resolve(rootDir, 'logo.png');
  const publicLogo = path.resolve(publicDir, 'logo.png');

  if (fs.existsSync(rootLogo)) {
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    try {
      fs.copyFileSync(rootLogo, publicLogo);
    } catch {
      // ignore
    }
  }
}

export default defineConfig(() => {
  syncRootLogo();

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'sync-root-logo-hook',
        buildStart() {
          syncRootLogo();
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
