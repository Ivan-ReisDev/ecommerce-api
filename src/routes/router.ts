import { Router } from "express";
import ProductsModuleRoutes from "../core/products-module/products-module-routes";
import SystemModuleRoutes from "../core/system-module/system-module-routes";
import UserModuleRoutes from "../core/user-module/user-module-routes";

const AppRoutes = Router();

AppRoutes.use("/user", UserModuleRoutes);
AppRoutes.use("/products", ProductsModuleRoutes);
AppRoutes.use("/info", SystemModuleRoutes);


export default AppRoutes;
