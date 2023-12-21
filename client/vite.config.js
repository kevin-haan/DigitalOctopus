import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({  }) => {
  
  return {
    plugins: [react()],
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: process.env.CLIENT_PORT, // Verwende den Port aus den Umgebungsvariablen
    },
    // Weitere Konfigurationen...
  };
});
