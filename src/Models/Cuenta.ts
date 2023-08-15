import {UserTypes} from "./User";

export interface CuentaTypes extends UserTypes{
    id?: number
    user_id: number
    nombre_usuario: string
    email_cuenta: string
    password_cuenta: string
}

export class Cuenta{
    private id?: number
    private user_id: number
    private nombre: string
    private email: string
    private password: string
    private create_at?: Date
    private update_at?: Date
    constructor(user_id: number, nombre: string, email: string, password: string){
        this.user_id = user_id
        this.nombre = nombre
        this.email = email
        this.password = password
        this.create_at = new Date(Date.now())
        this.update_at = new Date(Date.now())
        
    }
    public get get_id(){
        return this.id
    }
    public get get_update_at(){
        return this.update_at
    }

    public get get_create_at(){
        return this.create_at
    }

    public get get_password(){
        return this.password
    }

    public get get_email(){
        return this.email
    }

    public get get_nombre(){
        return this.nombre
    }

    public get get_user_id(){
        return this.user_id
    }

    public set_cuenta_id(id:number){
        this.id = id
    }

}
