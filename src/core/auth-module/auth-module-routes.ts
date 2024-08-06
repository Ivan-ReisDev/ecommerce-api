import express from "express";
import * as AuthController from "./auth-module-controller";

const AuthModuleRoutes = express.Router();

AuthModuleRoutes.route("/sign").post((req: any, res: any) => AuthController.login(req, res));

export default AuthModuleRoutes;