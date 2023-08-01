export const query = `
type Query {
    allPlayers: [Player]
    allGuilds: [Guild]
    getGuild (id:Int!) : Guild
    allPets: [Pet]
  }
`