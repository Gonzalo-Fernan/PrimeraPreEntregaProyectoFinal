import { Router } from "express";
import cartController from "../dao/controllers/cart.controller.js";
import { authUser } from "../middlewares/auth.js";

const cartsRouter = Router()
export default cartsRouter



cartsRouter.get("/", cartController.get) //Aceder a todos los carritos
cartsRouter.get("/:cid/", cartController.getById)//Acceder al carrito seleccionado
cartsRouter.post("/", cartController.create)//Agregar un carrito nuevo
cartsRouter.post("/:cid/products/:pid", cartController.add)//Agregar un producto al carrito seleccionado
cartsRouter.delete("/:cid/products/:pid", cartController.delete)//Eliminar un producto del carrito seleccionado 
cartsRouter.delete("/:cid", cartController.deleteAll)//Eliminar TODOS los productos de un carrito
cartsRouter.put("/:cid/products/:pid", cartController.update)//Actualizar la cantidad de un producto en un carrito
cartsRouter.put("/:cid", cartController.addMany)//Agregar varios productos al carrito

cartsRouter.get("/:cid/purchase", cartController.purchaseCart)