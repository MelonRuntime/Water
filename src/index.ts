import { dbAction } from "./methods/dbAction";
import { dbQuery } from "./methods/dbQuery"
import { DbConnection } from "./types/DbConection";

const pgMelon = (connectionInfo: DbConnection, logQuery: boolean = false) => { 
    return {
        query: (tableName: string) => dbQuery(tableName, connectionInfo, logQuery),
        action: (tableName: string) => dbAction(tableName, connectionInfo, logQuery)
    }
}

const a = pgMelon({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "123"
}, true)

console.log(a.action("newtable").update({column1: "baaaaaab"}).where("column1 = 'test'"))

export { pgMelon }

// where of Enumerable not working
// Enumerable last() not typed correctly