# 🍉 Water 
`v0.0.1`

Water is a micro-ORM + QueryBuilder designed to facilitate queries and operations on PostgreSQL databases designed to work in MelonRuntime

<hr>

## Installation

```bash
npm install water-melon-kit
```

## Usage

- **Importing the basic needs for your project**

    ```ts
    import Water = require("water-melon-kit") 
    import { DbConnection } from "water-melon-kit/src/types/DbConection"
    ```

        
- **Setting your connection info from the environment**
    ```ts
    const connection: DbConnection = {
        port: 5432,
        host: environment.getVariable("PG_HOST"),
        database: environment.getVariable("PG_DATABASE"),
        user: environment.getVariable("PG_USER  "),
        password: environment.getVariable("PG_PASSWORD")
    }
    ```
    
- **Configuring a Water function set**
    ```ts
    const water = Water(connection, true)
    ```

## Functions

- **`[water].query(tableName: string)`**

    Example:
    ```ts
    type User {
        id: number,
        name: string
    }
    
    const usersQuery = water.query("users").orderBy("id");
    const users = usersQuery.result<User>().elements();
    
    console.log(users); //[{id: 1, name: "Nicolas Lopes"}, {id: 2, name: "Guilherme Noghartt"}...]
    ```

- **`[water].action(tableName: string)`**

    Example:
    ```ts
    type User {
        id: number,
        name: string
    }
    
    const usersAction = water.action("users")
    const result = usersAction.insert({name: "Jefferson Quesado"})
    
    console.log(result); //1
    ```
    
- **`[water].rawQuery(sql: string)`**
- **`[water].rawAction(sql: string)`**
