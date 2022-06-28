# 🍉 Water 
`v0.0.1`

Water is a micro-ORM + QueryBuilder designed to facilitate queries and operations on PostgreSQL databases designed to work in MelonRuntime

<hr>

## Usage

- **Setting up Water and your connection info**
```ts
import Water = require("water-melon-kit") 
import { DbConnection } from "water-melon-kit/src/types/DbConection"

const connection: DbConnection = {
    host: environment.getVariable("PG_HOST"),
    port: 5432,
    database: environment.getVariable("PG_DATABASE"),
    user: environment.getVariable("PG_USER  "),
    password: environment.getVariable("PG_PASSWORD")
}
```
