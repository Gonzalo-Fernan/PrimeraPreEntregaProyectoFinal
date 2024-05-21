import { Router } from "express";
import ProductsController from "../dao/controllers/products.controller.js";
import { authAdmin } from "../middlewares/auth.js";


const productsRouter = Router()
export default productsRouter

productsRouter.get("/", ProductsController.getAll)
productsRouter.get("/:pid", ProductsController.getById)
productsRouter.post("/", authAdmin, ProductsController.addProduct)
productsRouter.put("/:pid", authAdmin,  ProductsController.updateProduct)
productsRouter.delete("/:pid", authAdmin, ProductsController.deleteProduct)

