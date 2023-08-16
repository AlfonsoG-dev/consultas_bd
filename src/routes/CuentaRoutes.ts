import { RoutesModel } from "../Models/RoutesModel";
import {CuentaController} from "../controllers/CuentaController"
import {AuthMiddleware} from "../middlewares/AuthMiddleware"
import express from "express"

export class CuentaRoutes implements RoutesModel{
    private cuenta_router: express.Router
    private controller: CuentaController
    private autenticate_user: AuthMiddleware;
    constructor(){
        this.cuenta_router = express.Router()
        this.controller = new CuentaController();
        this.autenticate_user = new AuthMiddleware();
    }
    UseMiddleware(){
        //verificate the user login
        this.cuenta_router.use( this.autenticate_user.verificar_autenticacion.bind(this.autenticate_user))
        this.cuenta_router.use(this.controller.verificate_data_cuenta.bind(this.controller))
    }
    get_all_route(): void {
        this.cuenta_router.get("/", this.controller.read_all_by_user.bind(this.controller))
    }
    get_by_name_route(): void {
        this.cuenta_router.post("/get-name", this.controller.read_by_name.bind(this.controller))
    }
    get_by_email_route(): void {
        this.cuenta_router.post("/get-email", this.controller.read_by_email.bind(this.controller))
    }
    get_by_id_route(): void {
        this.cuenta_router.get("/:id", this.controller.read_by_id.bind(this.controller))
    }
    post_register_route(): void {
        this.cuenta_router.post("/post-cuenta", this.controller.insert_register.bind(this.controller))
    }
    delete_register_route(): void {
        this.cuenta_router.delete("/delete-cuenta/:id", this.controller.delete_register.bind(this.controller))
    }
    update_register_route(): void {
        this.cuenta_router.put("/put-cuenta", this.controller.update_register.bind(this.controller))
    }

    get routes(): express.Router{
        this.UseMiddleware()
        this.get_all_route()
        this.get_by_name_route()
        this.get_by_email_route()
        this.get_by_id_route()
        this.post_register_route()
        this.delete_register_route()
        this.update_register_route()
        return this.cuenta_router
    }
}
