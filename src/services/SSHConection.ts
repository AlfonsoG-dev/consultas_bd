import {Client} from"ssh2"
import { ServerApiEnum } from "../Models/ServerEnums"

export class SSHConection{
    private client: Client;
    private host: Readonly<string>
    private port: Readonly<number>
    private username: Readonly<string>
    private password: Readonly<string>
    constructor(){
        this.client = new Client()
        this.host = ServerApiEnum.HOST_SSH
        this.port = ServerApiEnum.SSH_PORT 
        this.username = ServerApiEnum.USER_SSH
        this.password = ServerApiEnum.PASSWORD_USER_SSH
    }
    get tunel_config(){
        return {
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password
        }
    }
    ssh_conection(dstIP: string, dstPort: number){
        return new Promise((resolve, reject) =>{
            this.client.on('ready', () =>{
                this.client.forwardOut(this.tunel_config.host, this.tunel_config.port, dstIP, dstPort, (err, stream)=>{
                    if(err)reject(err)
                })
            })
        })
    }
}
