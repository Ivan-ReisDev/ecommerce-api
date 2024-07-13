import express from "express";
import * as UserController from "./user-module-controller";

const UserModuleRoutes = express.Router();

UserModuleRoutes.route("/insert").post((req: any, res: any) => UserController.createUser(req, res));
UserModuleRoutes.route("/list/:page").get((req: any, res: any) => UserController.listUsers(req, res));

export default UserModuleRoutes;