import { Cuenta, CuentaTypes } from "../Models/Cuenta";
import { DbConection } from "../services/DbConection";
import { ResultSetHeader, QueryError, Connection } from "mysql2";
import {DbQueryModel} from "../Models/DbQueryModel";

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
        return new Promise((resolve, reject)=>{
            this.query.execute('create table if not exists cuentas(id int not null unique primary key auto_increment, nombre varchar(100) not null, email varchar(100) not null, user_id int not null, create_at datetime not null, update_at datetime, foreign key(user_id) references `consulta`.`users`(id) on delete cascade on update cascade)', function(err: QueryError | null, res: ResultSetHeader | undefined){
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
            this.query.execute('select cuenta_id, nombre, email, create_at, update_at from `consulta`.cuentas where user_id=?', [user_id], function(err: QueryError | null, res: CuentaTypes[]){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    read_by_email(email: string, id:number): Promise<CuentaTypes[] | undefined> {
        return new Promise((resolve, reject) =>{
            this.query.execute('select nombre, email from `consulta`.cuentas where email=? and user_id=?', [email, id], function(err: QueryError| null, res: CuentaTypes[]){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    read_by_name(nombre: string, id: number): Promise<CuentaTypes[] | undefined> {
        return new Promise((resolve, reject)=>{
            this.query.execute('select nombre, email from `consulta`.cuentas where nombre = ? and user_id=?', [nombre, id], function(err: QueryError | null, res: CuentaTypes[]){
                if(err)reject(err)
                resolve(res)
            })
        })
    }

    read_by_user_id(user_id: number, nombre: string, email: string): Promise<CuentaTypes[] | undefined>{
        return new Promise((resolve, reject)=>{
            this.query.execute('select cuenta_id, nombre, email from `consulta`.cuentas where user_id=? && nombre=? || email =?', [user_id, nombre, email], function(err: QueryError | null, res: CuentaTypes[]){
                if(err) reject(err)
                resolve(res)
            })
        })
    }
    read_by_id(id: number, user_id: number): Promise<CuentaTypes[] | undefined> {
        return new Promise((resolve, reject) =>{
            this.query.execute('select nombre, email, create_at, update_at from `consulta`.cuentas where cuenta_id=? and user_id=?', [id, user_id], function(err: QueryError | null, res: CuentaTypes[]){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    insert_register(nCuenta: Cuenta): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.query.execute('insert into `consulta`.cuentas (nombre, email, user_id, create_at) values(?, ?, ?, ?)', [nCuenta.get_nombre, nCuenta.get_email, nCuenta.get_user_id, nCuenta.get_create_at], function(err: QueryError | null, res: ResultSetHeader){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    update_register(nCuenta: Cuenta): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.query.execute('update `consulta`.cuentas set nombre=?, email=?, update_at=? where cuenta_id=? and user_id=?', [nCuenta.get_nombre, nCuenta.get_email, nCuenta.get_update_at, nCuenta.get_id, nCuenta.get_user_id], function(err: QueryError | null, res: ResultSetHeader){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    delete_register(cuenta_id: number): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.query.execute('delete from `consulta`.cuentas where cuenta_id=?', [cuenta_id], function(err: QueryError | null, res: ResultSetHeader){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
}
