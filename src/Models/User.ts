import mysql from "mysql2"
export interface UserTypes extends mysql.RowDataPacket {
    id?: number | undefined,
    nombre: string,
    email: string,
    password: string,
    rol: string,
    create_at?: Date | undefined
    update_at?: Date | undefined
}


export class User{
    private id?: number | undefined
    private nombre: string
    private email: string
    private password: string
    private rol: string
    private create_at?: Date | undefined
    private update_at?: Date | undefined

    constructor(nombre: string, email:string, password: string, rol: string){
        this.nombre = nombre
        this.email = email
        this.password = password
        this.rol = rol
        this.create_at = new Date(Date.now())
        this.update_at = new Date(Date.now())
    }
    public get get_update_at(){
        return this.update_at
    }

    public get get_create_at(){
        return this.create_at
    }

    public get get_rol(){
        return this.rol
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
    public get get_id(){
        return this.id
    }
    public set_id(id: number){
        this.id=id
    }

}
