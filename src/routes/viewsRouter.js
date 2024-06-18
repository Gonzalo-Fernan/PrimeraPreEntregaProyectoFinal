import { Router } from "express";
import { auth, authUser }  from "../middlewares/auth.js";
import viewsController from "../dao/controllers/views.controller.js";
const router = Router()

router.get("/home", viewsController.home )
router.get("/realtimeproducts", auth, viewsController.realtimeProducts)
router.get("/chat", authUser, viewsController.chat)
router.get("/products", auth, viewsController.products) 
router.get("/cart/:cid",auth, viewsController.cartById)
router.get("/products/:pid", auth, viewsController.productDetail) 
router.get("/register", viewsController.register)
router.get("/login", viewsController.login)
router.get('/restore', viewsController.restore)
router.get('/mail', viewsController.restorePasword)

  



export default router

