import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { SystemController } from "../controllers/SystemController";
import { ProductsController } from "../controllers/ProductsController";


const router = Router();

const systemController = new SystemController();
const userController = new UserController();
const productController = new ProductsController();




router.post("/info", systemController.createInfo);
router.put("/info", systemController.updateInfo);
router.delete("/info/:idInfo", systemController.deleteInfo);
router.get("/info", systemController.getInfo);


router.post("/user", userController.createUser);
router.get("/user/:page", userController.listUsers);

router.post("/products", productController.createProducts);




export default router;
