import mysql, {QueryError, ResultSetHeader} from "mysql2"
import { UserTypes, User} from "../Models/User";
import {DbQueryModel} from "../Models/DbQueryModel";
import { DbConection } from "../services/DbConection";
export class UserRepository implements DbQueryModel {
    private query: mysql.Connection = new DbConection().normal_connection;
    verificate_database(): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.query.execute('create database if not exists consulta', function(err: QueryError | null, res: ResultSetHeader | undefined){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    select_database(): Promise<mysql.ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.query.query('use consulta', function(err: QueryError | null, res: ResultSetHeader | undefined){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
    verificate_table(): Promise<mysql.ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.query.execute('create table if not exists users(id int not null unique primary key auto_increment, nombre varchar(100) not null unique, email varchar(100) not null unique, password varchar(100) not null, rol varchar(50), create_at datetime, update_at datetime)', function(err: QueryError | null, res: ResultSetHeader | undefined){
                if(err) reject(err)
                resolve(res)
            })
        })
    }
     get read_all(): Promise<UserTypes[] | undefined> {
        return new Promise((resolve, reject) => {
            this.query.execute('select id, nombre, email from `consulta`.users', (err: QueryError | null, res: UserTypes[]) => {
                if (err) reject(err)
                resolve(res)
            })
        })
    }
     read_by_name(user_name: string): Promise<UserTypes[] | undefined> {
        return new Promise((resolve, reject) => {
            this.query.execute('select nombre, email from `consulta`.users where nombre = ?', [user_name], function (err: QueryError | null, res: UserTypes[]) {
                if (err) reject(err)
                resolve(res)
            })
        })
    }
    read_by_email(user_email: string): Promise<UserTypes[] | undefined> {
        return new Promise((resolve, reject) =>{
            this.query.execute('select nombre, email from `consulta`.users where email=?', [user_email], function(err: QueryError | null, res: UserTypes[]){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
     read_by_id(user_id: number): Promise<UserTypes[] | undefined> {
        return new Promise((resolve, reject) => {
            this.query.execute('select nombre, email, rol from `consulta`.users where id =?', [user_id], function (err: QueryError | null, res: UserTypes[]) {
                if (err) reject(err)
                resolve(res)
            })
        })
    }
     insert_register(nUser: User): Promise<ResultSetHeader | undefined> {
         //TODO: la fecha deberia ser pasada por la request o por el objeto user
        return new Promise((resolve, reject) => {
            this.query.execute('insert into `consulta`.users (nombre, email, password, rol, create_at) values (?, ?, ?, ?, ?)', [nUser.get_nombre, nUser.get_email, nUser.get_password, nUser.get_rol, nUser.get_create_at], function (err: QueryError | null, res: ResultSetHeader) {
                if (err) reject(err)
                resolve(res)
            })

        })
    }
     update_register (nUser: User): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject) => {
            this.query.execute('update `consulta`.users set nombre = ?, email = ?, update_at = ? where id=?', [nUser.get_nombre, nUser.get_email, nUser.get_update_at, nUser.get_id], function (err: QueryError | null, res: ResultSetHeader) {
                if (err) reject(err)
                resolve(res)
            })
        })
    }
     delete_register (user_id: number): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject) => {
            this.query.execute('delete from `consulta`.users where id = ?', [user_id], function (err: QueryError | null, res: ResultSetHeader) {
                if (err) reject(err)
                resolve(res)
            })
        })
    }
    autenticate_credentials (nUser: User): Promise<UserTypes[] | undefined>{
        return new Promise((resolve, reject) => {
            this.query.execute('select id, nombre, email, rol from `consulta`.users where nombre=? or email=? and password =?', [nUser.get_nombre, nUser.get_email, nUser.get_password], function(err: QueryError | null, res: UserTypes[]){
                if(err)reject(err)
                resolve(res)
            })
        })
    }
}
