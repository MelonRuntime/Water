import { actionDefaultDisallows } from "../consts/disallowDefaults";
import { DbAction } from "../types/DbAction"
import { DbConnection } from "../types/DbConnection"
import { executeRaw } from "./executeRaw"
import { prepare } from "./prepare";

function dbAction(tableName: string, connectionInfo: DbConnection, logQuery: boolean = false) {
    const res = {
        _tableName: tableName,
        _connectionInfo: connectionInfo,
        update: function (fieldValues: Record<string, any>, sql: string[] = [""]) {
            let sqlString = `UPDATE ${this._tableName} SET `;

            return {
                where: (condition: string) => {
                    const fieldValuesRaw = Object.entries(fieldValues);

                    fieldValuesRaw.forEach((updateEntry, index) => {
                        sqlString = sqlString += 
                            `${updateEntry[0]} 
                                = ${typeof updateEntry[1] === 'string' ? '\'' + updateEntry[1] + '\'' : updateEntry[1]}`;
            
                        if(index < fieldValuesRaw.length - 1) {
                            sqlString = sqlString += ", ";
                        }
                    })
        
                    sqlString = sqlString += ` WHERE ${condition}`;
                    sql.push(sqlString);
                    sql = sql.map(expression => prepare(expression, actionDefaultDisallows()));
                    return executeRaw(connectionInfo, logQuery).action(sql);
                },
                all: () => {
                    const fieldValuesRaw = Object.entries(fieldValues);

                    fieldValuesRaw.forEach((updateEntry, index) => {
                        sqlString = sqlString += 
                            `${updateEntry[0]} 
                                = ${typeof updateEntry[1] === 'string' ? '\'' + updateEntry[1] + '\'' : updateEntry[1]}`;
            
                        if(index < fieldValuesRaw.length - 1) {
                            sqlString = sqlString += ", ";
                        }
                    })
        
                    sql.push(sqlString);
                    sql = sql.map(expression => prepare(expression, actionDefaultDisallows()));
                    return executeRaw(connectionInfo, logQuery).action(sql);
                }
            }
        },
        remove: function (sql: string[] = [""]) {
            let sqlString = `DELETE FROM ${this._tableName} `;

            return {
                where: (condition: string) => {
                    sqlString = sqlString += `WHERE ${condition}`;
                    sql.push(sqlString);
                    sql = sql.map(expression => prepare(expression, actionDefaultDisallows()));
                    return executeRaw(connectionInfo, logQuery).action(sql);
                },
                all: () => {
                    sql.push(sqlString);
                    sql = sql.map(expression => prepare(expression, actionDefaultDisallows()));
                    return executeRaw(connectionInfo, logQuery).action(sql);
                }
            }
        },
        insert: function (fieldValues: Record<string, any>) {
            let sqlString = `INSERT INTO ${this._tableName}`;

            const fields = Object.keys(fieldValues);
            const values = Object.values(fieldValues).map(value => {
                return typeof value === "string" ? `'${value}'` : value
            });

            sqlString = sqlString += ` (${fields.join(", ").replace(", )", "")}) VALUES`;
            sqlString = sqlString += ` (${values.join(", ").replace(", )", "")});`;

            sqlString = prepare(sqlString, actionDefaultDisallows());
            const result = executeRaw(connectionInfo, logQuery).action(sqlString.split(" "));

            return result;
        }
    }

    return res as DbAction;
}

export { dbAction }