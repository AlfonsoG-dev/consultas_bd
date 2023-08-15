import {Client} from"ssh2"
import mysql, {Connection, QueryError} from "mysql2"

export class SSHConection{
    private client: Client;
    constructor(){
        this.client = new Client()
    }
    ssh_conection(){
        const dbServer = {
            host: 'localhost',
            port: 3306,
            user: 'pym',
            password: '5x5W12',
            database: 'consulta'
        }

        const tunel = {
            host: '192.168.2.114',
            port: 22,
            username: 'server',
            password: '{alf}'
        }
        const forward = {
            srcHost: '127.0.0.1',
            srcPort: 3306,
            dstHost: dbServer.host,
            dstPort: dbServer.port
        }
        const ssh_con: Promise<Connection> =  new Promise((resolve, reject)=>{
            this.client.on('ready', () =>{
                this.client.forwardOut(forward.srcHost, forward.dstPort, forward.dstHost, forward.dstPort, (err, stream)=>{
                    if(err)reject(err)
                    const update_db_server ={
                        ...dbServer,
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
        return ssh_con
    }
}
