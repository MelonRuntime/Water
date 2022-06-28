import { dbAction } from "./methods/dbAction";
import { dbQuery } from "./methods/dbQuery"
import { executeRaw } from "./methods/executeRaw";
import { DbConnection } from "./types/DbConection";

const pgMelon = (connectionInfo: DbConnection, logQuery: boolean = false) => { 
    return {
        query: (tableName: string) => dbQuery(tableName, connectionInfo, logQuery),
        action: (tableName: string) => dbAction(tableName, connectionInfo, logQuery),
        rawQuery: (sql: string) => executeRaw(connectionInfo, logQuery).query(sql.split(" ")),
        rawAction: (sql: string) => executeRaw(connectionInfo, logQuery).action(sql.split(" "))
    }
}

const a = pgMelon({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "123"
}, true)

console.log(a.query("newtable").select("*").where("column1 = 'baaaaaab'").result<any>().elements())

export { pgMelon }

// where of Enumerable not working
// Enumerable last() not typed correctly