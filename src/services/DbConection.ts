import mysql, {Connection, Pool} from "mysql2"
import {ServerApiEnum} from "../Models/ServerEnums";

export class DbConection{
    private conection;
    private host: Readonly<string> = ServerApiEnum.HOST;
    private user_test: Readonly<string> = ServerApiEnum.USER_1;
    private user_root: Readonly<string> = ServerApiEnum.USER_2;
    private password_1: Readonly<string> = ServerApiEnum.PASSWORD_USER_1;
    private password_2: Readonly<string> = ServerApiEnum.PASSWORD_USER_2;
    private connection_limit: Readonly<number> = ServerApiEnum.CONECTION_LIMIT;
    private queue_limit: Readonly<number> = ServerApiEnum.QUEUE_LIMIT;
    constructor(){
        this.conection = mysql;
    }
     get normal_connection():Connection {
        return this.conection.createConnection(
            {
                host: this.host,
                user: this.user_test,
                password: this.password_1,
            }
        )
    }
    get pool_connection(): Pool{
        return this.conection.createPool({
            host: this.host,
            user: this.user_root,
            password: this.password_2,
            connectionLimit: this.connection_limit,
            maxIdle: this.connection_limit, 
            queueLimit:this.queue_limit
        })
    }
}
