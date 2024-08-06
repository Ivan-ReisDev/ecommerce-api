import express from "express";
import * as UserController from "./user-module-controller";
import { AuthMiddleware } from "../../middlewares/auth-middleware";
const UserModuleRoutes = express.Router();

UserModuleRoutes.route("/insert").post(AuthMiddleware,(req: any, res: any) => UserController.createUser(req, res));
UserModuleRoutes.route("/list/:page").get(AuthMiddleware,(req: any, res: any) => UserController.listUsers(req, res));
UserModuleRoutes.route("/user/me").get(AuthMiddleware, UserController.currentUser, (req: any, res: any) => UserController.listUsers(req, res));

export default UserModuleRoutes;