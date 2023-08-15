import { CuentaRepository } from "../repository/CuentaRepository";
import { CuentaTypes, Cuenta } from "../Models/Cuenta";
import { Request, Response, NextFunction } from "express";


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

    async read_all(req: Request, res:Response){
        try{
            const data_req = req.cookies['miApiCookie']
            const data_res = await this.repository.get_cuentas_by_user(data_req[0].nombre, data_req[0].email);
                if(data_res !== undefined && data_res?.length > 0){
                    res.status(200).json(data_res)
                }else{
                    res.status(400).json({error: "no hay cuentas"})
                }
        }catch(err: CuentaControllerError){
            throw Error(`${err} en la ruta ${req.path}`)
        }
    }
}
