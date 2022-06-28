import { DbConnection } from "../types/DbConection";
import { DbQuery } from "../types/DbQuery";
import { executeRaw } from "./executeRaw";

function dbQuery(tableName: string, connectionInfo: DbConnection, logQuery = false) {
    const res = {
        _tableName: tableName,
        _connectionInfo: connectionInfo,
        select: function (field: string, sql = [""], initial = true) {
            if(!sql[sql.length - 1].startsWith("SELECT") && initial) {
                sql.push(`SELECT ${field} FROM ${this._tableName}`) ;
            }

            return {
                where: (condition: string) => {
                    if(!sql[sql.length - 1].startsWith("WHERE")) {
                        sql.push(`WHERE ${condition}`);
                        return this.select(field, sql, false);
                    }
                    
                    sql.push(`AND ${condition}`);
                    return this.select(field, sql, false);
                },
                orderBy: (fieldName: string) => {
                    sql.push(`ORDER BY ${fieldName}`);
                    return this.select(field, sql, false);
                },
                orderByDesc: (fieldName: string) => {
                    sql.push(`ORDER BY ${fieldName} DESC`);
                    return this.select(field, sql, false);
                },
                limit: (quantity: number) => {
                    sql.push(`LIMIT ${quantity}`);
                    return this.select(field, sql, false);
                },
                result: () => {
                    return executeRaw(connectionInfo, logQuery).query(sql)
                } 
            }
        }
    }

    return res as DbQuery;
}

export { dbQuery }