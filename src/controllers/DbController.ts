import {Connection} from "mysql2";
import {UserTypes} from "../Models/User";
import { DbConection } from "../services/DbConection";
//tipo de dato para la consulta
type T= any
export class DbController{

    private static conection: Connection = new DbConection().normal_connection
    any_execute(sql: string, ...args: any): Promise<T>{
        return new Promise((resolve, reject)=>{
            DbController.conection.execute(sql, args, function(err, res: UserTypes[]){
                if(err) reject(err)
                resolve(res)
            })
        })
    }
    any_query(sql: string, ...args: any): Promise<T>{
        return new Promise((resolve, reject)=>{
            DbController.conection.query(sql, args, function(err, res){
                if(err) reject(err)
                resolve(res)
            })
        })
    }
}
