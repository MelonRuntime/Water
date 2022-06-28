import { DbConnection } from "./DbConection"

type DbAction = {
    _tableName: string,
    _connectionInfo: DbConnection,
    update: (fieldValues: Record<string, any>) => {
        where: (condition: string) => number,
        all: () => number 
    }
    remove: () => {
        where: (condition: string) => number,
        all: () => number 
    },
    insert: (fieldValues: Record<string, any>) => number
}

export { DbAction }