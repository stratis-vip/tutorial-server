import { PrismaClient, Prisma } from '@prisma/client';
import { ApolloServer } from 'apollo-server'
import { typeDefs } from './type-defs/index.js'
import { GraphQLDateTime } from 'graphql-scalars'
// import { query } from "./type-defs/queries.js"

const prisma = new PrismaClient(
    {
        log: ['query', 'info', 'warn', 'error']
    }
);

const resolvers = {
    DateTime: GraphQLDateTime,
    Query: {
        allPlayers: () => {
            return prisma.players.findMany({
                include: {
                    guild: true
                }
            });
        },
        allPets: () => prisma.pet.findMany(),
        allGuilds: () => prisma.guilds.findMany({ include: { players: true, guildLogs: true } }),
        getGuild: (_, { id }) =>
            prisma.guilds.findUnique({
                where: { id }, include: {
                    players: true
                }
            })


    },
    Mutation: {
        updateGuild: async (_, { id, name, league }) => {
            //check if exists
            console.log("+++++++++++++++++++++++++++++++++")
            console.log(id, name, league)
            console.log("+++++++++++++++++++++++++++++++++")
            const guild = await prisma.guilds.findUnique({ where: { id } })
            if (guild === null) {
                //create guild
                console.log('guild is null', guild, id, name, league)
                const g = await createAGuild(id, name, league)
                return g
            } else {
                //update guild
                const d = new Date()
                console.log('guild found', guild)

                if (name === guild.name && league === guild.league) {
                    console.log('NO UPDATE NEEDED')
                    return guild
                } else {
                    let newGuild = null
                    if (name !== guild.name) {
                        newGuild = await prisma.guilds.update({
                            where: { id },
                            data: {
                                name
                            },
                            guildLogs: {
                                create: {
                                    change: "NAME",
                                    date: d.toISOString(),
                                    log: `set name to "${name}"`
                                }
                            }
                        })
                    }
                    if (league !== guild.league) {
                        newGuild = await prisma.guilds.update({
                            where: { id },
                            data: {
                                league
                            },
                            guildLogs: {
                                create: {
                                    change: "PROMOTION",
                                    date: d.toISOString(),
                                    log: `set league to "${league}"`
                                }
                            }
                        })
                    }
                    return newGuild
                }

            }
        },
        addGuild: async (_, { id, name, league }) => {

            const guild = await createAGuild(id, name, league)
            return guild
        }
    }
}


const createAGuild = async (id, name, league) => {
    const d = new Date()
    return await prisma.guilds.create({
        data: {
            id, name, league,

            guildLogs: {
                create: [{
                    change: "NAME",
                    log: `set name to "${name}"`,
                    date: d.toISOString()
                },
                {

                    change: "PROMOTION",
                    date: d.toISOString(),
                    log: `set league to "${league}"`

                }
                ]
            }
        }
    })
}
// const typeDefs = `


// type Player {
//     id: Int!
//     name: String!
//     createdAt: DateTime!
//     updatedAt: DateTime!
//     guild: Guild!

//   }

//   type Guild {
//     id: Int!
//     name: String!
//     players: [Player]
//   }



// `



const server = new ApolloServer({ resolvers, typeDefs });
server.listen({ port: 4000 }).then(() => { console.log("server is running!") });