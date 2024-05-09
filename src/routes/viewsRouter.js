import { Router } from "express";
import { auth }  from "../middlewares/auth.js";
import viewsController from "../dao/controllers/views.controller.js";
const router = Router()

router.get("/home", viewsController.home )
router.get("/realtimeproducts", auth, viewsController.realtimeProducts)
router.get("/chat", auth, viewsController.chat)
router.get("/products", auth, viewsController.products) 
router.get("/cart/:cid",auth, viewsController.cartById)
router.get("/products/:pid", auth, viewsController.productDetail) 
router.get("/register", viewsController.register)
router.get("/login", viewsController.login)
router.get('/restore', viewsController.restore)
  



export default router




















/* router.post("/realtimeproducts", (req,res)=>{
 
    let newProduct = req.body
    console.log(newProduct);
     
    products.addProduct(newProduct)

    res.send("producto agregado")  
}) 
  */