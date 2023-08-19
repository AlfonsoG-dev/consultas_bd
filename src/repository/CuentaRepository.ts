import { Cuenta, CuentaTypes } from "../Models/Cuenta";
import { ResultSetHeader } from "mysql2";
import {DbQueryModel} from "../Models/DbQueryModel";
import {DbController} from "../controllers/DbController";

export class CuentaRepository implements DbQueryModel{
    private cursor;
    constructor(){
        this.cursor = new DbController()
    }
    verificate_database(): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.cursor.any_execute('create database if not exists consulta')
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    verificate_table(): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.cursor.any_execute('create table if not exists `consulta`.cuentas(cuenta_id int not null unique primary key auto_increment, nombre varchar(100) not null, email varchar(100) not null, user_id int not null, create_at datetime not null, update_at datetime, foreign key(user_id) references `consulta`.`users`(id) on delete cascade on update cascade)')
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    select_database(): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject) =>{
            this.cursor.any_query('use consulta')
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    get read_all(): Promise<CuentaTypes[] | undefined> {
        return new Promise((resolve, reject)=>{
            this.cursor.any_execute('select nombre, email, create_at, update_at from `consulta`.cuentas')
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    get_cuentas_by_user(user_id: number) : Promise<CuentaTypes[] | undefined>{
        return new Promise((resolve, reject)=>{
            this.cursor.any_execute('select cuenta_id, nombre, email, create_at, update_at from `consulta`.cuentas where user_id=?', user_id)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    read_by_email(email: string, id:number): Promise<CuentaTypes[] | undefined> {
        return new Promise((resolve, reject) =>{
            this.cursor.any_execute('select nombre, email from `consulta`.cuentas where email=? and user_id=?', email, id)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    read_by_name(nombre: string, id: number): Promise<CuentaTypes[] | undefined> {
        return new Promise((resolve, reject)=>{
            this.cursor.any_execute('select nombre, email from `consulta`.cuentas where nombre = ? and user_id=?', nombre, id)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }

    read_by_user_id(user_id: number, nombre: string, email: string): Promise<CuentaTypes[] | undefined>{
        return new Promise((resolve, reject)=>{
            this.cursor.any_execute('select cuenta_id, nombre, email from `consulta`.cuentas where user_id=? && nombre=? || user_id =? && email =?', user_id, nombre, user_id, email)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    read_by_id(id: number, user_id: number): Promise<CuentaTypes[] | undefined> {
        return new Promise((resolve, reject) =>{
            this.cursor.any_execute('select nombre, email, create_at, update_at from `consulta`.cuentas where cuenta_id=? and user_id=?', id, user_id)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    insert_register(nCuenta: Omit<Cuenta, "get_id"| "set_id" | "get_update_at" | "get_password">): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.cursor.any_execute('insert into `consulta`.cuentas (nombre, email, user_id, create_at) values(?, ?, ?, ?)', nCuenta.get_nombre, nCuenta.get_email, nCuenta.get_user_id, nCuenta.get_create_at)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    update_register(nCuenta: Omit<Cuenta, "get_create_at" | "get_password" | "set_id">): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.cursor.any_execute('update `consulta`.cuentas set nombre=?, email=?, update_at=? where cuenta_id=? and user_id=?', nCuenta.get_nombre, nCuenta.get_email, nCuenta.get_update_at, nCuenta.get_id, nCuenta.get_user_id)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    delete_register(cuenta_id: number): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.cursor.any_execute('delete from `consulta`.cuentas where cuenta_id=?', cuenta_id)
            .then((res) => resolve(res) )
            .catch((err) => reject(err))
        })
    }
}
