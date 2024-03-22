import { Router } from "express";
import ProductManager from "../managers/products.manager.js";
import ProductManagerDB from "../dao/services/productManagerDB.js";

const productsRouter = Router()
export default productsRouter

const PATH = "./src/data/products.json"

const products = new ProductManager(PATH)
const productsDB = new ProductManagerDB()
const getAllProducts = await products.getProducts()

productsRouter.get("/", async (req, res) =>{
    
    let limit = parseInt(req.query.limit)

    if (limit) {
        
        let data = await productsDB.getAll(limit)
        res.send(data)
        

    }else{
        
        return res.send(await productsDB.getAll())

    }


   /*  let limit = parseInt(req.query.limit)

    if (limit) {

        let allProducts = await getAllProducts
        let queryLimit = allProducts.slice(0,limit)
       return res.send(queryLimit) 

    }else{
        
        return res.send(getAllProducts)

    }  */

})

productsRouter.get("/:pid", async (req, res) =>{
    
    let pid = req.params.pid
    let product = await productsDB.getById(pid)

    res.send(product)

    /* let prodID = parseInt(req.params.pid)

    let allProducts = await getAllProducts

    let productSelected = allProducts.find((prod)=> prod.id === prodID)

    res.send(productSelected)
     */
})

productsRouter.post("/", async (req, res) =>{

    let newProduct = req.body
    let productAdded = await productsDB.addProduct(newProduct)

    res.send(productAdded)

    /* let newProduct = req.body

    await products.addProduct(newProduct)

    res.send("new product added")  */
    
})

productsRouter.put("/:pid", async (req, res) =>{

    let pid = req.params.pid
    let body = req.body

    let updatedProduct = await productsDB.updateProduct(pid, body)
    res.send(updatedProduct)

    /* let paramId = req.params.pid
    let idParsed = parseInt(paramId)

    let productToupdate = req.body
    
    await products.updateProduct(idParsed, productToupdate)
    
    res.send("product updated") */

   
})

productsRouter.delete("/:pid", async (req, res) =>{

    let pid = req.params.pid

   let productDeleted = await productsDB.deleteProduct(pid)

   res.send(productDeleted)
   
    /* let pid = req.params.pid
    
    let parsedPid = parseInt(pid)

    await products.deleteProduct(parsedPid)

    res.send("producto eliminado exitosamente") */

})

