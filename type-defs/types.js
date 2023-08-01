

export const types = `
type Player {
    id: Int!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    guild: Guild!

  }

  type Guild {
    id: Int!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    league: LeagueType!
    players: [Player]
    guildLogs: [GuildLogs]
  }

  type Team {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime! 
    players: [Player]
    teamType: TeamType!
    pet: Pet
    power: Int!
    lineup: String!
    pets: String
    petId: String
    playerId: Int!
    date:DateTime!
  }

  type Pet {
    smallName:String!
    name: String!
    teams: [Team]
  }

  type GuildLogs {
    id: String!
    guildId: Int!
    guilds: [Guild]
    change: GuildChanges!
    date: DateTime!
    log: String!
  }


  enum TeamType {
    HEROES
    TITANS
  }

  enum LeagueType {
    GOLD
    SILVER
    BRONZE
    QUALIFYING
  }

  enum GuildChanges{
    NAME
    PROMOTION 
  }
`