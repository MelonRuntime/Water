import { dbQuery } from "./methods/dbQuery";

const pgMelon = {
    query: dbQuery
}

export { pgMelon }

// where of Enumerable not working
// Enumerable last() not typed correctly