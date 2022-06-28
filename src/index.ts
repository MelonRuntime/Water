import { dbQuery } from "./methods/dbQuery"
import { DbConnection } from "./types/DbConection";

const pgMelon = (connectionInfo: DbConnection, logQuery: boolean = false) => { 
    return {
        query: (tableName: string) => dbQuery(tableName, connectionInfo, logQuery)
    }
}

const a = pgMelon({} as DbConnection, true)

console.log(a.query("test").select("test").where("a = 1").result<any>())

export { pgMelon }

// where of Enumerable not working
// Enumerable last() not typed correctly