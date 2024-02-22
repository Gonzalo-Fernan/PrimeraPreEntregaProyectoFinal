import { Router } from "express";
import ProductManager from "../index.js";

const productsRouter = Router()
export default productsRouter

const port = 8080
const PATH = "./src/products.json"

const products = new ProductManager(PATH)
const getAllProducts = await products.getProducts()

productsRouter.get("/", async (req, res) =>{

    let limit = parseInt(req.query.limit)

    if (limit) {

        let allProducts = await getAllProducts
        let queryLimit = allProducts.slice(0,limit)
       return res.send(queryLimit) 

    }else{
        
        return res.send(getAllProducts)

    }

})

productsRouter.get("/:pid", async (req, res) =>{

    let prodID = parseInt(req.params.pid)

    let allProducts = await getAllProducts

    let productSelected = allProducts.find((prod)=> prod.id === prodID)

    res.send(productSelected)
    
})

productsRouter.post("/", async (req, res) =>{

    let newProduct = req.body

    await products.addProduct(newProduct)

    res.send("new product added")
    
})

productsRouter.put("/:pid", async (req, res) =>{
    
    let paramId = req.params.pid
    let idParsed = parseInt(paramId)

    let productToupdate = req.body
    
    await products.updateProduct(idParsed, productToupdate)
    
    res.send("product updated")

   
})

productsRouter.delete("/:pid", async (req, res) =>{
    let pid = req.params.pid
    
    let parsedPid = parseInt(pid)

    await products.deleteProduct(parsedPid)

    res.send("producto eliminado exitosamente")

})