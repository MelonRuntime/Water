const prepare = (sqlExpression: string, checkList: { [expression: string]: boolean }) => {
    Object.entries(checkList).forEach(item => {
        if(sqlExpression.includes(item[0]) && item[1]) {
            throw new Error(`Expression ${item} is not allowed in the query`);
        }
 
        if(sqlExpression.includes(item[0]) && !item[1]) {
            sqlExpression = sqlExpression.replaceAll(item[0], "");
        }
    });

    return sqlExpression;
}

export { prepare }