import {Client} from"ssh2"
import mysql, {Connection, QueryError} from "mysql2"
import { DbConfig } from "../configs/DBConfig"

export class SSHConection{
    private client: Client;
    private dbServer: DbConfig;
    constructor(){
        this.client = new Client()
        this.dbServer = new DbConfig()
    }

    get tunel_config(){
        return {
            host: '192.168.2.114',
            port: 22,
            username: 'server',
            password: '{alf}'
        }
    }

    forward_config(dbServer: any){
        return {
            srcHost: '127.0.0.1',
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
