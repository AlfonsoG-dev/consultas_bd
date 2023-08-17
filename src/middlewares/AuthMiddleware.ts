import { Request, Response, NextFunction } from "express";
import { UserTypes, User } from "../Models/User";
import { UserRepository } from "../repository/UserRepository";

type ErrorTypes = Error | any | unknown
export class AuthMiddleware {
    private repo: UserRepository;
    constructor(){
        this.repo = new UserRepository()
    }
    /*
     * nombre can be email or nombre of user
     * but the UI does not show a field for email 
    */
    async autenticate_user(req: Request, res:Response){
        try{
            const data_req: UserTypes = req.body;
            if(data_req === undefined){
                res.status(400).json({error: "no se reciben datos"})
            }else{
                const myUser: User = new User(data_req.nombre, data_req.nombre, data_req.password, data_req.rol)
                const data_res: UserTypes[] | undefined = await this.repo.autenticate_credentials(myUser)
                if(data_res !== undefined && data_res.length > 0){
                    res.cookie('miApiCookie', data_res)
                    res.status(200).json({msg: "usuario autenticado"})
                }else{
                    res.status(400).json({error: "el usuario no esta registrado"})
                }
            }
        }catch(err: ErrorTypes){
            res.status(400).json({error: `${err} en la ruta ${req.path}`})
        }
    }

    verificar_autenticacion(req: Request, res: Response, next: NextFunction){

        try{
            const data_req = req.cookies
            if(data_req['miApiCookie'] !== undefined){
                next()
            }else{
                res.status(400).json({error: "no autenticado"})
            }
        }catch(err: ErrorTypes){
            res.status(400).json({error: `${err} en la ruta ${req.path}`})
        }
    }

    verificar_isAdmin(req: Request, res: Response, next: NextFunction){
        try{
            const data_req = req.cookies
            const [data_res] = data_req['miApiCookie']
            if(data_res !== undefined && data_res.rol === 'admin'){
                next()
            }else{
                res.status(400).json({error: "solo admin puede acceder a este sitio"})
            }
        }catch(err: ErrorTypes){
            res.status(400).json({error: `${err} en la ruta ${req.path}`})
        }
    }
}
