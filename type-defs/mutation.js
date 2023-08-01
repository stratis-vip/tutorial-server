export const mutation = `
    type Mutation {
       addGuild(id:Int!, name:String!, league:LeagueType!) : Guild!
       updateGuild(id:Int!, name:String, league:LeagueType) : Guild!
      }
`