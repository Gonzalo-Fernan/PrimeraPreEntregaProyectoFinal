import { Router } from "express";
import ProductsController from "../dao/controllers/products.controller.js";
import { authAdminOrPremium } from "../middlewares/auth.js";
import { generateMockProducts} from "../utils.js";

const productsRouter = Router()
export default productsRouter

productsRouter.get("/", ProductsController.getAll)
productsRouter.get("/:pid", ProductsController.getById)
productsRouter.post("/addProduct" , authAdminOrPremium, ProductsController.addProduct)
productsRouter.put("/:pid", authAdminOrPremium,  ProductsController.updateProduct)
productsRouter.delete("/:pid", authAdminOrPremium, ProductsController.deleteProduct)

productsRouter.get("/mockingproducts", (req, res) => {
    try {
        const products = generateMockProducts()
        res.json(products)
    } catch (error) {
        console.log(error);
    }
});



