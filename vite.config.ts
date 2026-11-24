import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Clé football-data.org lue dans .env.local (jamais envoyée au navigateur : pas de préfixe VITE_).
  // FOOTBALL_DATA_TOKEN est accepté aussi (nom utilisé sur la branche accueil_Hugo).
  const env = loadEnv(mode, '.', '')
  const key = env.FOOTBALL_DATA_KEY || env.FOOTBALL_DATA_TOKEN

  // Le proxy ajoute la clé aux appels vers football-data.org.
  const proxy = key
    ? {
        '/api/football-data': {
          target: 'https://api.football-data.org',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api\/football-data/, ''),
          headers: { 'X-Auth-Token': key },
        },
      }
    : undefined

  return {
    plugins: [react()],
    server: { proxy },
    preview: { proxy },
  }
})