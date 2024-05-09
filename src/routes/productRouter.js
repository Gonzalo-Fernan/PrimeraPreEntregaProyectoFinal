import { Router } from "express";
import ProductsController from "../dao/controllers/products.controller.js";


const productsRouter = Router()
export default productsRouter

productsRouter.get("/", ProductsController.getAll)
productsRouter.get("/:pid", ProductsController.getById)
productsRouter.post("/", ProductsController.addProduct)
productsRouter.put("/:pid", ProductsController.updateProduct)
productsRouter.delete("/:pid", ProductsController.deleteProduct)

