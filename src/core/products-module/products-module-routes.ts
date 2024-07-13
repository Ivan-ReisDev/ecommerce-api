import express from "express";
import * as ProductsController from "./products-module-controller";

const ProductsModuleRoutes = express.Router();

ProductsModuleRoutes.route("/insert").post((req: any, res: any) => ProductsController.createProducts(req, res));

export default ProductsModuleRoutes;