import { NextFunction, Request, Response } from "express";
import {ResultSetHeader} from "mysql2";
import { UserTypes, User} from "../Models/User";
import {UserRepository} from "../repository/UserRepository";
type UserControllerError = Error | any | unknown

type UserRepositoryType = UserTypes[] | undefined

export class UserController {
    private repository: UserRepository;
    constructor(){
        this.repository = new UserRepository();
    }

    async verificate_data_user(req: Request, res: Response, next: NextFunction){
        try{
            const data_res = Promise.all([this.repository.verificate_database(), this.repository.select_database(), this.repository.verificate_table()])
            console.log(await data_res)
            next()
        }catch(err: UserControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }
    async read_all(req: Request, res: Response){
        try{
            const data_res: UserRepositoryType = await this.repository.read_all
            if(data_res!==undefined && data_res.length > 0){
                res.status(200).json(data_res)
            }else{
                res.status(400).json({error: "no se puden obtener los datos"})
            }
        }catch(err: UserControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }
    async read_by_name(req: Request, res: Response){
        try{
            const data_req:UserTypes = req.body
            const data_res: UserRepositoryType = await this.repository.read_by_name(data_req.nombre)
            if(data_res !== undefined && data_res.length >0){
                res.status(200).json(data_res)
            }else{
                res.status(400).json({error: "usuario no encontrado"})
            }

        }catch(err: UserControllerError){
            throw Error(`${err} en la ruta ${req.path}`);
        }
    }

    async read_by_email(req: Request, res: Response){
        try{
            const data_req: UserTypes = req.body
            const data_res: UserRepositoryType = await this.repository.read_by_email(data_req.email)
            if(data_res !== undefined && data_res.length > 0) {
                 res.status(200).json(data_res)
            }else{
                res.status(400).json({error: "el usuario no existe"})
            }
        }catch(err: UserControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }
    async read_by_id(req: Request, res: Response){
        try{
            const data_req: number = parseInt(req.params.id)
            const data_res: UserRepositoryType = await this.repository.read_by_id(data_req)
            if(data_res !== undefined && data_res.length > 0){
                res.status(200).json(data_res)
            }else{
                res.status(400).json({error: "usuario no encontrado"})
            }
        }catch(err: UserControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }
    async insert_user(req: Request, res: Response){
        try{
            const data_req: UserTypes = req.body
            const buscado: UserRepositoryType = await this.repository.read_by_email(data_req.email)
            if(buscado === undefined || buscado.length === 0){
                const myUser: User = new User(data_req.nombre, data_req.email, data_req.password, data_req.rol)
                const data_res = await this.repository.insert_register(myUser)
                res.status(201).json(data_res)
            }else{
                res.status(400).json({error: "el usuario ya se encuentra registrado"})
            }

        }catch(err: UserControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }
    async update_user(req: Request, res: Response){
        try{
            const data_req: UserTypes = req.body
            if(data_req.id === undefined){
                res.status(400).json({error: "no se provee de un id"})
            }else{
                const buscado: UserRepositoryType = await this.repository.read_by_id(data_req.id)
                if(buscado !== undefined && buscado.length > 0){
                    const myUser: User = new User(data_req.nombre, data_req.email, data_req.password, data_req.rol);
                    myUser.set_id(data_req.id!)
                    const data_res: ResultSetHeader | undefined = await this.repository.update_register(myUser)
                    res.status(200).json(data_res)
                }else{
                    res.status(400).json({error: "el usuario no existe"})
                }
            }
        }catch(err: UserControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }


    async delete_user(req: Request, res: Response){
        try{
            const data_req: number = parseInt(req.params.id)
            const buscado: UserRepositoryType = await this.repository.read_by_id(data_req)
            if(buscado !== undefined && buscado.length > 0){
                const data_res: ResultSetHeader | undefined = await this.repository.delete_register(data_req)
                res.status(200).json(data_res)
            }else{
                res.status(400).json({error: "no se puede eliminar un usuario que no existe"})
            }
        }catch(err: UserControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }
}
