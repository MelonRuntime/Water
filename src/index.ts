import { dbAction } from "./methods/dbAction";
import { dbQuery } from "./methods/dbQuery"
import { executeRaw } from "./methods/executeRaw";
import { DbConnection } from "./types/DbConection";

const Water = (connectionInfo: DbConnection, logQuery: boolean = false) => { 
    return {
        query: (tableName: string) => dbQuery(tableName, connectionInfo, logQuery),
        action: (tableName: string) => dbAction(tableName, connectionInfo, logQuery),
        rawQuery: (sql: string) => executeRaw(connectionInfo, logQuery).query(sql.split(" ")),
        rawAction: (sql: string) => executeRaw(connectionInfo, logQuery).action(sql.split(" "))
    }
}

export { Water }