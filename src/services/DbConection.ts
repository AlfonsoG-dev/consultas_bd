import mysql, { Connection, Pool } from "mysql2"
import { DbConfig } from "../Models/DBConfig";
export class DbConection {
    private conection;
    private db_config: DbConfig
    constructor() {
        this.conection = mysql;
        this.db_config = new DbConfig();
    }
    get normal_connection(): Connection {
        return this.conection.createConnection(this.db_config.normal_config)
    }
    get pool_connection(): Pool {
        return this.conection.createPool(this.db_config.pool_config)
    }
}