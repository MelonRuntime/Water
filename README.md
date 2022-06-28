# 🍉 Water 
`v0.0.1`

Water is a micro-ORM + QueryBuilder designed to facilitate queries and operations on PostgreSQL databases designed to work in MelonRuntime

<hr>

## Usage

- **Setting up Water and your connection info**

    - Importing the basic needs

        ```ts
        import Water = require("water-melon-kit") 
        import { DbConnection } from "water-melon-kit/src/types/DbConection"
        ```
//Setup connection information from the environment

const connection: DbConnection = {
    port: 5432,
    host: environment.getVariable("PG_HOST"),
    database: environment.getVariable("PG_DATABASE"),
    user: environment.getVariable("PG_USER  "),
    password: environment.getVariable("PG_PASSWORD")
}

const water = Water(connection, true)
```
