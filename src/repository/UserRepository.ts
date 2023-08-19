import mysql, {ResultSetHeader} from "mysql2"
import { UserTypes, User} from "../Models/User";
import {DbQueryModel} from "../Models/DbQueryModel";
import {DbController} from "../controllers/DbController";
export class UserRepository implements DbQueryModel {
    private cursor;
    constructor() {
        this.cursor = new DbController();

    }
    verificate_database(): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.cursor.any_execute('create database if not exists consulta')
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    select_database(): Promise<mysql.ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.cursor.any_query('use consulta')
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    verificate_table(): Promise<mysql.ResultSetHeader | undefined> {
        return new Promise((resolve, reject)=>{
            this.cursor.any_execute('create table if not exists `consulta`.users(id int not null unique primary key auto_increment, nombre varchar(100) not null unique, email varchar(100) not null unique, password varchar(100) not null, rol varchar(50), create_at datetime, update_at datetime)')
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
     get read_all(): Promise<UserTypes[] | undefined> {
        return new Promise((resolve, reject) => {
            this.cursor.any_execute('select id, nombre, email from `consulta`.users')
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
     read_by_name(user_name: string): Promise<UserTypes[] | undefined> {
        return new Promise((resolve, reject) => {
            this.cursor.any_execute('select nombre, email from `consulta`.users where nombre = ?', user_name)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    read_by_email(user_email: string): Promise<UserTypes[] | undefined> {
        return new Promise((resolve, reject) =>{
            this.cursor.any_execute('select nombre, email from `consulta`.users where email=?', user_email)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
     read_by_id(user_id: number): Promise<UserTypes[] | undefined> {
        return new Promise((resolve, reject) => {
            this.cursor.any_execute('select nombre, email, rol from `consulta`.users where id =?', user_id)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
            
        })
    }
     insert_register(nUser: Omit<User, "get_update_at" | "get_id" | "set_id">): Promise<ResultSetHeader | undefined> {
         //TODO: la fecha deberia ser pasada por la request o por el objeto user
        return new Promise((resolve, reject) => {
            this.cursor.any_execute('insert into `consulta`.users (nombre, email, password, rol, create_at) values (?, ?, ?, ?, ?)', nUser.get_nombre, nUser.get_email, nUser.get_password, nUser.get_rol, nUser.get_create_at)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
     update_register (nUser: Omit<User, "get_password" | "get_create_at" | "get_rol" | "set_id">): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject) => {
            this.cursor.any_execute('update `consulta`.users set nombre = ?, email = ?, update_at = ? where id=?', nUser.get_nombre, nUser.get_email, nUser.get_update_at, nUser.get_id)                
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
     delete_register (user_id: number): Promise<ResultSetHeader | undefined> {
        return new Promise((resolve, reject) => {
            this.cursor.any_execute('delete from `consulta`.users where id = ?', user_id)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        })
    }
    async autenticate_credentials (nUser: User): Promise<UserTypes[] | undefined>{
          return new Promise((resolve, reject)=>{
              this.cursor.any_execute('select id, nombre, email, rol from `consulta`.users where nombre=? and password =? or email=? and password=?', nUser.get_nombre,nUser.get_password, nUser.get_email, nUser.get_password)
              .then((res) => resolve(res))
              .catch((err) => reject(err))
        })
    }
}
