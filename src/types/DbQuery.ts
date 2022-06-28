import { DbConnection } from "./DbConection"

type DbQuery = {
    _tableName: string,
    _connectionInfo: DbConnection,
    select: (field: string) => {
        where: (condition: string) => DbQuery["_select"],
        orderBy: (fieldName: string) => DbQuery["_select"],
        orderByDesc: (fieldName: string) => DbQuery["_select"],
        limit: (quantity: number) => DbQuery["_select"],
        result<T>(): Enumerable<T>
    }
    _select: {
        where: (condition: string) => DbQuery["_select"],
        orderBy: (fieldName: string) => DbQuery["_select"],
        orderByDesc: (fieldName: string) => DbQuery["_select"],
        limit: (quantity: number) => DbQuery["_select"],
        result<T>(): Enumerable<T>
    }
}

export { DbQuery }