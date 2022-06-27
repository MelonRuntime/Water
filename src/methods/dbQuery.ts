import { DbConnection } from "../types/DbConection"
import { DbQuery } from "../types/DbQuery"
const { PgClient } = data

function dbQuery(tableName: string, connectionInfo: DbConnection, logQuery: boolean = false) {
    this._tableName = tableName
    this._connectionInfo = connectionInfo

    function select(field: string, sql: string[] = [""]) {
        if(!sql[sql.length - 1].startsWith("SELECT")) {
            sql.push(`SELECT ${field} FROM ${this._tableName}`) 
        }

        this.where = (condition: string) => {
            if(!sql[sql.length - 1].startsWith("WHERE")) {
                sql.push(`WHERE ${condition}`)
                return this
            }
            
            sql.push(`AND ${condition}`)
            return this
        }

        this.orderBy = (fieldName: string) => {
            sql.push(`ORDER BY ${fieldName}`)
            return this
        }

        this.limit = (quantity: number) => {
            sql.push(`LIMIT ${quantity}`)
            return this
        }
        
        function result<T> () {
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

        this.result = result
        return this
    }

    this.select = select
    return this as DbQuery
}

export { dbQuery }