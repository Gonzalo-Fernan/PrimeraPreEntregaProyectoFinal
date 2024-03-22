import { Router } from "express";
import ProductManager from "../managers/products.manager.js";


const router = Router()


const PATH = "./src/data/products.json"
const products = new ProductManager(PATH)
const getAllProducts = await products.getProducts()



router.get("/home",(req,res)=>{

    res.render("home", {getAllProducts, style: "home.css"})
    
})

router.get("/realtimeproducts",(req,res)=>{

    res.render("realTimeProducts",{style: "realTimeProducts.css"})

})
router.get("/chat",(req, res)=>{
    res.render("chat", {style: "chat.css"})
})




export default router




















/* router.post("/realtimeproducts", (req,res)=>{
 
    let newProduct = req.body
    console.log(newProduct);
     
    products.addProduct(newProduct)

    res.send("producto agregado")  
}) 
  */