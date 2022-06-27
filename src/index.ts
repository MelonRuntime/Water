import { dbQuery } from "./methods/dbQuery";

const pgMelon = {
    query: dbQuery
}

const base = pgMelon.query("table", {
    host: 'string',
    port: 1234,
    database: 'string',
    user: 'string',
    password: 'string'
}, true)

base.select("field").where('a = 1').orderBy("id").limit(10).result<string>()

//export { pgMelon }