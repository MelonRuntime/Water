import { DbAction } from "../types/DbAction"
import { DbConnection } from "../types/DbConection"
const { PgClient } = data

function dbAction(tableName: string, connectionInfo: DbConnection, logQuery: boolean = false) {
    const res = {
        _tableName: tableName,
        _connectionInfo: connectionInfo,
        update: function (fieldValues: Record<string, any>, sql: string[] = [""]) {
            let sqlString = `UPDATE ${this._tableName} SET `

            return {
                where: (condition: string) => {
                    const fieldValuesRaw = Object.entries(fieldValues)

                    fieldValuesRaw.forEach((updateEntry, index) => {
                        sqlString = sqlString += 
                            `${updateEntry[0]} = ${typeof updateEntry[1] === 'string' ? '\'' + updateEntry[1] + '\'' : updateEntry[1]}`
            
                        if(index < fieldValuesRaw.length - 1) {
                            sqlString = sqlString += ", "
                        }
                    })
        
                    sqlString = sqlString += ` WHERE ${condition}`
                    sql.push(sqlString)
                    return this.update(fieldValues, sql)._execute()
                },
                all: () => {
                    const fieldValuesRaw = Object.entries(fieldValues)

                    fieldValuesRaw.forEach((updateEntry, index) => {
                        sqlString = sqlString += 
                            `${updateEntry[0]} = ${typeof updateEntry[1] === 'string' ? '\'' + updateEntry[1] + '\'' : updateEntry[1]}`
            
                        if(index < fieldValuesRaw.length - 1) {
                            sqlString = sqlString += ", "
                        }
                    })
        
                    sql.push(sqlString)
                    return this.update(fieldValues, sql)._execute()
                },
                _execute: function() {
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
                    const result = client.executeNonQuery(finalSql)
        
                    return result
                }
            }
        },
        remove: function (sql: string[] = [""]) {
            let sqlString = `DELETE FROM ${this._tableName} `

            return {
                where: (condition: string) => {
                    sqlString = sqlString += `WHERE ${condition}`
                    sql.push(sqlString)
                    return this.remove(sql)._execute()
                },
                all: () => {
                    sql.push(sqlString)
                    return this.remove(sql)._execute()
                },
                _execute: function() {
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
                    const result = client.executeNonQuery(finalSql)
        
                    return result
                }
            }
        },
        insert: function (fieldValues: Record<string, any>) {
            let sqlString = `INSERT INTO ${this._tableName}`

            const fields = Object.keys(fieldValues)
            const values = Object.values(fieldValues).map(value => {
                return typeof value === "string" ? `'${value}'` : value
            })

            sqlString = sqlString += ` (${fields.join(", ").replace(", )", "")}) VALUES`
            sqlString = sqlString += ` (${values.join(", ").replace(", )", "")});`

            const client: DatabaseClient = new PgClient(
                connectionInfo.host,
                connectionInfo.port,
                connectionInfo.database,
                connectionInfo.user,
                connectionInfo.password
            )

            if(logQuery) {
                console.log(sqlString)
            }

            const result = client.executeNonQuery(sqlString)

            return result
        }
    }

    return res as DbAction
}

export { dbAction }