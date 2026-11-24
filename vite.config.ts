import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
export default defineConfig(({mode}) => {
 const env = loadEnv(mode, process.cwd(), '')
 const proxy = { '/api/football': { target:'https://api.football-data.org', changeOrigin:true, rewrite:(path:string)=>path.replace(/^\/api\/football/, '/v4'), headers:{'X-Auth-Token':env.FOOTBALL_DATA_TOKEN || ''} } }
 return {plugins:[react()],server:{proxy},preview:{proxy}}
})
