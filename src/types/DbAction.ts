import { DbConnection } from "./DbConection"

type DbAction = {
    _tableName: string,
    _connectionInfo: DbConnection,
    _sql: string[],
    update: (fieldValues: Record<string, any>) => {
        where: (condition: string) => number,
        all: () => number 
    }
    remove: () => {
        where: (condition: string) => number,
        all: () => number 
    }
}

export { DbAction }