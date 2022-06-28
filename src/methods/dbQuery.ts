import { DbConnection } from "../types/DbConection"
import { DbQuery } from "../types/DbQuery"
const { PgClient } = data

function dbQuery(tableName: string, connectionInfo: DbConnection, logQuery: boolean = false) {
    const res = {
        _tableName: tableName,
        _connectionInfo: connectionInfo,
        select: function (field: string, sql: string[] = [""]) {
            if(!sql[sql.length - 1].startsWith("SELECT")) {
                sql.push(`SELECT ${field} FROM ${this._tableName}`) 
            }

            return {
                where: (condition: string) => {
                    if(!sql[sql.length - 1].startsWith("WHERE")) {
                        sql.push(`WHERE ${condition}`)
                        return this.select(field, sql)
                    }
                    
                    sql.push(`AND ${condition}`)
                    return this.select(field, sql)
                },
                orderBy: (fieldName: string) => {
                    sql.push(`ORDER BY ${fieldName}`)
                    return this.select(field, sql)
                },
                orderByDesc: (fieldName: string) => {
                    sql.push(`ORDER BY ${fieldName} DESC`)
                    return this.select(field, sql)
                },
                limit: (quantity: number) => {
                    sql.push(`LIMIT ${quantity}`)
                    return this.select(field, sql)
                },
                result: function<T>() {
                    const client: DatabaseClient = new PgClient(
                        connectionInfo.host,
                        connectionInfo.port,
                        connectionInfo.database,
                        connectionInfo.user,
                        connectionInfo.password
                    )
        
                    if(logQuery) {
                        console.log(sql.slice(1))
                    }
        
                    const finalSql = sql.join(" ").trim()
                    const result = client.executeQuery(finalSql)
        
                    return new Enumerable<T>(result)
                }
            }
        }
    }

    return res as DbQuery
}

export { dbQuery }