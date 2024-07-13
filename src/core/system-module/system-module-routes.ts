import express from "express";
import * as SystemController from "./system-module-controller";

const SystemModuleRoutes = express.Router();

SystemModuleRoutes.route("/insert").post((req: any, res: any) => SystemController.createInfo(req, res));
SystemModuleRoutes.route("/info").put((req: any, res: any) => SystemController.updateInfo(req, res));
SystemModuleRoutes.route("/info").get((req: any, res: any) => SystemController.getInfo(req, res));
SystemModuleRoutes.route("/info/:idInfo").delete((req: any, res: any) => SystemController.deleteInfo(req, res));

export default SystemModuleRoutes;