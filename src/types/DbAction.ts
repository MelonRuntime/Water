type DbAction = (tableName: string) => {
    _sql: string[],
    _tableName: string,
    update: (fieldValues: Record<string, any>) => {
        whereEquals: (fieldName: string, condition: string) => DbAction
        whereContains: (fieldName: string, condition: string) => DbAction
        whereNotEquals: (fieldName: string, condition: string) => DbAction,
        whereNotContains: (fieldName: string, condition: string) => DbAction,
    },
    delete: {
        whereEquals: (fieldName: string, condition: string) => DbAction
        whereContains: (fieldName: string, condition: string) => DbAction
        whereNotEquals: (fieldName: string, condition: string) => DbAction,
        whereNotContains: (fieldName: string, condition: string) => DbAction,
    }
    result(): number
}