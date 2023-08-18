import {UserTypes} from "../Models/User";
import { DbConection } from "../services/DbConection";
const conection = new DbConection().normal_connection
//tipo de dato para la consulta
type T= any
export class DbController{
    any_execute(sql: string, ...args: any): Promise<T>{
        return new Promise((resolve, reject)=>{
            conection.execute(sql, args, function(err, res: UserTypes[]){
                if(err) reject(err)
                resolve(res)
            })
        })
    }
    any_query(sql: string, ...args: any): Promise<T>{
        return new Promise((resolve, reject)=>{
            conection.query(sql, args, function(err, res){
                if(err) reject(err)
                resolve(res)
            })
        })
    }
}
