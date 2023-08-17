import {User, UserTypes} from "./User";

export interface CuentaTypes extends UserTypes{
    user_id: number
}

export class Cuenta extends User{

    private user_id: number
    constructor(user_id: number, nombre: string, email: string, password: string, rol: string){
        super(nombre, email, password, rol)
        this.user_id = user_id
    }

    public get get_user_id(){
        return this.user_id
    }

}
