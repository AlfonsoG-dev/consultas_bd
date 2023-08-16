import express, {Express, Request, Response} from "express"
import cors from "cors"
import { UserRoutes} from "./routes/UserRoutes";
import { CuentaRoutes } from "./routes/CuentaRoutes";
import { ServerApiEnum } from "./configs/ServerEnums";
import cookieParser from "cookie-parser";
import {AuthMiddleware} from "./middlewares/AuthMiddleware";

class ServerApi{
    public app: Express;
    private static PORT: Readonly<number> = ServerApiEnum.PORT; 
    private user_routes: UserRoutes;
    private cuenta_router: CuentaRoutes;
    private auth_middleware: AuthMiddleware;
    constructor() {
        this.app = express();
        this.user_routes = new UserRoutes();
        this.cuenta_router = new CuentaRoutes();
        this.auth_middleware = new AuthMiddleware();
    }
    UseLibrery(){
        this.app.use(cors())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.json())
        this.app.use(cookieParser())
    }
    UseErrorMiddleware(){
        this.app.use(function(req, res){
            res.status(404).json({error: "página no disponible"})
        })
    }

    UseRoutes(){
        this.app.use("/user", this.user_routes.routes)
        //this.app.use("/cuenta", this.cuenta_router.routes)
    }

    get init(){
        this.UseLibrery()
        this.app.post("/", this.auth_middleware.autenticate_user.bind(this.auth_middleware))
        this.app.get("/", function(req: Request, res: Response){
            res.send(req.ip)
        })
        this.UseRoutes()
        this.UseErrorMiddleware()
        this.app.listen(ServerApi.PORT, ()=>{
            console.log(`express server in port ${ServerApi.PORT}`)
        })
        return this.app;
    }
}
const miApi = new ServerApi();
miApi.init;
