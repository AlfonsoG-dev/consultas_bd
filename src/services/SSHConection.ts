import {Client} from"ssh2"
import mysql, {Connection, QueryError} from "mysql2"
import { DbConfig } from "../configs/DBConfig"
import { ServerApiEnum } from "../configs/ServerEnums";

export class SSHConection{
    private client: Client;
    private dbServer: DbConfig;
    private ssh_user: Readonly<string> = ServerApiEnum.USER_SSH
    private ssh_port: Readonly<number> = ServerApiEnum.SSH_PORT
    private ssh_host: Readonly<string> = ServerApiEnum.HOST_SSH
    private ssh_password: Readonly<string> = ServerApiEnum.PASSWORD_USER_SSH
    private ssh_db_host: Readonly<string> = ServerApiEnum.HOST
    constructor(){
        this.client = new Client()
        this.dbServer = new DbConfig()
    }

    get tunel_config(){
        return {
            host: this.ssh_host,
            port: this.ssh_port,
            username: this.ssh_user,
            password: this.ssh_password
        }
    }

    forward_config(dbServer: any){
        return {
            srcHost: this.ssh_db_host,
            srcPort: 3306,
            dstHost: dbServer.host,
            dstPort: dbServer.port

        }
    }
    ssh_conection():Promise<Connection>{
        const db_server = this.dbServer.db_server_config
        const tunel = this.tunel_config
        const forward = this.forward_config(db_server)

        return new Promise((resolve, reject)=>{
            this.client.on('ready', () =>{
                this.client.forwardOut(forward.srcHost, forward.dstPort, forward.dstHost, forward.dstPort, (err, stream)=>{
                    if(err)reject(err)
                    const update_db_server ={
                        ...db_server,
                        stream
                    }

                    const conection: Connection = mysql.createConnection(update_db_server)
                    conection.connect((err: QueryError | null) =>{
                        if(err){
                            reject(err)
                        }
                        resolve(conection)
                    })
                })
            }).connect(tunel)
        })
    }
}
