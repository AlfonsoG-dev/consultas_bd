import mysql, { Connection, Pool } from "mysql2"
import { DbConfig } from "../Models/DBConfig";
import { SSHConection } from "./SSHConection";
export class DbConection {
    private conection: typeof mysql;
    private db_ssh: SSHConection;
    private db_config: DbConfig
    constructor() {
        this.conection = mysql;
        this.db_ssh = new SSHConection();
        this.db_config = new DbConfig();
    }
    get normal_connection(): Connection {
        return this.conection.createConnection(this.db_config.normal_config)
    }
    get pool_connection(): Pool {
        return this.conection.createPool(this.db_config.pool_config)
    }

    async ssh_conection(): Promise<Connection>{
        const ssh = this.db_ssh
        return new Promise((resolve, reject)=>{
            const conn = ssh.ssh_conection()
            conn.then((result) => resolve(result))
            conn.catch((err)=>reject(err))
        })
    }
}
