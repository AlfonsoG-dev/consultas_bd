import { RoutesModel } from "../Models/RoutesModel";
import {CuentaController} from "../controllers/CuentaController"
import express from "express"

export class CuentaRoutes implements RoutesModel{
    private cuenta_router: express.Router
    private controller: CuentaController
    constructor(){
        this.cuenta_router = express.Router()
        this.controller = new CuentaController();
    }
    UseMiddleware(){
        this.cuenta_router.use(this.controller.verificate_data_cuenta.bind(this.controller))
    }
    get_all_route(): void {
        this.cuenta_router.get("/", this.controller.read_all.bind(this.controller))
    }
    get_by_name_route(): void {
        throw new Error("Method not implemented.");
    }
    get_by_email_route(): void {
        throw new Error("Method not implemented.");
    }
    get_by_id_route(): void {
        throw new Error("Method not implemented.");
    }
    post_register_route(): void {
        throw new Error("Method not implemented.");
    }
    delete_register_route(): void {
        throw new Error("Method not implemented.");
    }
    update_register_route(): void {
        throw new Error("Method not implemented.");
    }

    get routes(): express.Router{
        this.UseMiddleware()
        this.get_all_route()
        return this.cuenta_router
    }
}
