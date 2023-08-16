import { UserController } from "../controllers/UserController";
import express,{ Router } from "express";
import { RoutesModel } from "../Models/RoutesModel";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
export class UserRoutes implements RoutesModel{
    private controller: UserController;
    private user_routes: Router;
    private auth_middleware: AuthMiddleware
    constructor(){
        this.controller = new UserController()
        this.user_routes = express.Router()
        this.auth_middleware = new AuthMiddleware()
    }
    UseMiddleware(){
        this.user_routes.use(this.auth_middleware.verificar_autenticacion.bind(this.auth_middleware));
        this.user_routes.use(this.auth_middleware.verificar_isAdmin.bind(this.auth_middleware))
        this.user_routes.use(this.controller.verificate_data_user.bind(this.controller))
    }
    get_all_route(){
        this.user_routes.get("/", this.controller.read_all.bind(this.controller))
    }
    get_name_route(): void {
        this.user_routes.post("/get-name", this.controller.read_by_name.bind(this.controller))
    }
    get_email_route(): void {
        this.user_routes.post("/get-email", this.controller.read_by_email.bind(this.controller))
    }
    get_by_id_route(): void {
        this.user_routes.get("/get-id/:id", this.controller.read_by_id.bind(this.controller))
    }
    post_register_route(): void {
        this.user_routes.post("/post-user", this.controller.insert_user.bind(this.controller))
    }
    delete_register_route(): void {
        this.user_routes.delete("/delete-user/:id", this.controller.delete_user.bind(this.controller))
    }
    update_register_route(): void {
        this.user_routes.put("/update-user", this.controller.update_user.bind(this.controller))
    }
    get routes(): express.Router{
        this.UseMiddleware()
        this.get_all_route()
        this.get_by_name_route()
        this.get_by_id_route()
        this.get_by_email_route()
        this.post_register_route()
        this.delete_register_route()
        this.update_register_route()
        return this.user_routes
    }
}
