import { CuentaRepository } from "../repository/CuentaRepository";
import { CuentaTypes, Cuenta } from "../Models/Cuenta";
import { Request, Response, NextFunction } from "express";
import {ResultSetHeader} from "mysql2";


type CuentaControllerError = Error | any | unknown

type CuentaRepositoryType = CuentaTypes[] | undefined

export class CuentaController{

    private repository: CuentaRepository
    constructor(){
        this.repository = new CuentaRepository();
    }

    async verificate_data_cuenta(req: Request, res: Response, next: NextFunction){
        try{
            const data_res = Promise.all([this.repository.verificate_database(), this.repository.select_database(), this.repository.verificate_table()])
            console.log(await data_res)
            next()
        }catch(err: CuentaControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }

    async read_all_by_user(req: Request, res:Response){
        try{
            const data_req = req.cookies['miApiCookie']
            const data_res: CuentaRepositoryType = await this.repository.get_cuentas_by_user(data_req[0].id);
                if(data_res !== undefined && data_res?.length > 0){
                    res.status(200).json(data_res)
                }else{
                    res.status(400).json({error: "no hay cuentas"})
                }
        }catch(err: CuentaControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }
    async read_all(req: Request, res: Response){
        try{
            const [data_req] = req.cookies['miApiCookie']
            if(data_req.rol === 'admin'){
                const data_res: CuentaRepositoryType = await this.repository.read_all
                res.status(200).json(data_res)
            }else{
                res.status(400).json({error: "solo admin tiene acceso"})
            }

        }catch(err: CuentaControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }

    async read_by_email(req: Request, res: Response){
        try{
            const data_req: CuentaTypes = req.body
            const data_res: CuentaRepositoryType = await this.repository.read_by_email(data_req.email)
            if(data_res !== undefined && data_res.length > 0){
                res.status(200).json(data_res)
            }else{
                res.status(400).json({error: "la cuenta no esta registrada"})
            }

        }catch(err: CuentaControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }
    
    async read_by_name(req: Request, res: Response){
        try{
            const data_req: CuentaTypes = req.body
            console.log(data_req)
            const data_res: CuentaRepositoryType = await this.repository.read_by_name(data_req.nombre)

            if(data_res !== undefined && data_res.length > 0){
                res.status(200).json(data_res)
            }else{
                res.status(400).json({error: "la cuenta no se encuentra registrada"})
            }

        }catch(err: CuentaControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }
    async read_by_id(req: Request, res: Response){
        try{
            const data_req: number = parseInt(req.params.id)
            const data_res: CuentaTypes[] | undefined = await this.repository.read_by_id(data_req)
            if(data_res !== undefined && data_res.length > 0 ){ 
                res.status(200).json(data_res)
            }else{
                res.status(400).json({error: "no se encuentra la cuenta"})
            }
        }catch(err: CuentaControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }

    async insert_register(req: Request, res: Response){
        try{
            const data_req: CuentaTypes = req.body
            const data_user = req.cookies['miApiCookie']
            const nCuenta: Cuenta = new Cuenta(data_user[0] .id,data_req.nombre, data_req.email, data_req.password, data_user[0].rol);
            const data_res: ResultSetHeader | undefined = await this.repository.insert_register(nCuenta)
            if(data_res !== undefined){
                res.status(201).json(data_res)               
            }else{
                res.status(400).json({error: "no se puede guardar el usuario"})
            }
        }catch(err: CuentaControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }
}
