import { Cuenta, CuentaTypes } from "../Models/Cuenta";
import { DbConection } from "../services/DbConection";
import { ResultSetHeader, QueryError, Connection } from "mysql2";
import {DbQueryModel} from "../Models/DbQueryModel";
import {UserTypes, User} from "../Models/User";

export class CuentaRepository implements DbQueryModel{
    private query: Connection
    constructor(){
        this.query = new DbConection().normal_connection;
    }
    verificate_database(): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.query.execute('create database if not exists consulta', function(err: QueryError | null, res: ResultSetHeader | undefined){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    verificate_table(): Promise<ResultSetHeader | undefined> {
        //TODO: verificar si cumple
        return new Promise((resolve, reject)=>{
            this.query.execute('create table if not exists cuentas(id int not null unique primary key auto_increment, nombre varchar(100) not null, email varchar(100) not null unique, user_id int not null, create_at datetime not null, update_at datetime, foreign key(user_id) references `consulta`.`users`(id) on delete cascade on update cascade)', function(err: QueryError | null, res: ResultSetHeader | undefined){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    select_database(): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject) =>{
            this.query.query('use consulta', function(err: QueryError | null, res: ResultSetHeader | undefined) {
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    get read_all(): Promise<CuentaTypes[] | undefined> {
        return new Promise((resolve, reject)=>{
            this.query.execute('select nombre, email, create_at, update_at from `consulta`.cuentas', function(err: QueryError | null, res: CuentaTypes[] | undefined){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    get_cuentas_by_user(user_id: number) : Promise<CuentaTypes[] | undefined>{
        return new Promise((resolve, reject)=>{
            this.query.execute('select id, nombre, email, create_at, update_at from `consulta`.cuentas where user_id=?', [user_id], function(err: QueryError | null, res: CuentaTypes[]){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    read_by_email(email: string): Promise<CuentaTypes[] | undefined> {
        return new Promise((resolve, reject) =>{
            this.query.execute('select nombre, email from `consulta`.cuentas where email=?', [email], function(err: QueryError| null, res: CuentaTypes[]){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    read_by_name(nombre: string): Promise<CuentaTypes[] | undefined> {
        return new Promise((resolve, reject)=>{
            this.query.execute('select nombre, email from `consulta`.cuentas where nombre = ?', [nombre], function(err: QueryError | null, res: CuentaTypes[]){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    read_by_id(user_id: number): Promise<UserTypes[] | undefined> {
        throw new Error("Method not implemented.");
    }
    insert_register(nUser: User): Promise<ResultSetHeader | undefined> {
        throw new Error("Method not implemented.");
    }
    update_register(nUser: User): Promise<ResultSetHeader | undefined> {
        throw new Error("Method not implemented.");
    }
    delete_register(user_id: number): Promise<ResultSetHeader | undefined> {
        throw new Error("Method not implemented.");
    }
}
