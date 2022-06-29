import { DbConnection } from "../types/DbConnection"
const { PgClient } = data

const executeRaw = (connectionInfo: DbConnection, logQuery: boolean) => {
    return {
        _getClient: function() {
            return new PgClient(
                connectionInfo.host,
                connectionInfo.port,
                connectionInfo.database,
                connectionInfo.user,
                connectionInfo.password
            )
        },
        query: function<T>(sql: string[]) {
            const client = this._getClient()
            const finalSql = sql.join(" ").trim()
            const result = client.executeQuery(finalSql)

            if(logQuery) {
                console.log(sql.slice(1))
            }

            return new Enumerable<T>(result)
        },
        action: function(sql: string[]) {
            const client = this._getClient()
            const finalSql = sql.join(" ").trim()
            const result = client.executeNonQuery(finalSql)

            if(logQuery) {
                console.log(sql.slice(1))
            }

            return result
        }
    }
}

export { executeRaw }