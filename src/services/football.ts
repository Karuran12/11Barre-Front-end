export type Team = { id: number; name: string; crest: string }
export type Standing = { position: number; team: Team; playedGames: number; won: number; draw: number; lost: number; goalsFor: number; goalsAgainst: number; goalDifference: number; points: number }
export type Player = { id: number; name: string; position: string; nationality: string }
export type Club = Team & { venue?: string; founded?: number; coach?: { name: string }; squad?: Player[] }
async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`/api/football${path}`, { signal })
  if (!response.ok) throw new Error(response.status === 429 ? 'Limite de requêtes atteinte. Réessaie plus tard.' : `API indisponible (${response.status}). Vérifie la configuration et les droits du token.`)
  return response.json() as Promise<T>
}
export async function standings(signal?: AbortSignal) {
  const data = await request<{ standings: { type: string; group?: string; table: Standing[] }[] }>('/competitions/CL/standings', signal)
  const tables = data.standings.filter(s => s.type === 'TOTAL')
  if (!tables.length) throw new Error('Aucun classement disponible pour la saison courante.')
  return tables
}
export const getClub = (id: number, signal?: AbortSignal) => request<Club>(`/teams/${id}`, signal)
