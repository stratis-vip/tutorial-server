import { mutation } from "./mutation.js"
import { query } from "./queries.js"
import { types } from "./types.js"
import { scalar } from './scalar.js'


export const typeDefs = [scalar, query, mutation, types]