import { Router } from "express";
import fs from "fs";
import ProductManager from "../index.js";
import { randomUUID } from "crypto";


const cartsRouter = Router()
export default cartsRouter

const port = 8080
const PATH = "./src/products.json"
const cartPath = "./src/carts.json"
const products = new ProductManager(PATH)
const getAllProducts = await products.getProducts()


cartsRouter.get("/", async (req, res) =>{

    let allCarts =  JSON.parse(await fs.promises.readFile(cartPath, "utf-8"))
   
    res.send(allCarts)

    
})


cartsRouter.get("/:cid/", async (req, res) =>{

    let cartID = req.params.cid

    let carts = JSON.parse(await fs.promises.readFile(cartPath, "utf-8"))

    let selectedCart = carts.find(cart => cart.id === cartID)

    res.send(selectedCart.products)

    
})


//Agregar un carrito nuevo

cartsRouter.post("/", async (req, res) =>{
    try{
        let carts = JSON.parse(await fs.promises.readFile(cartPath, "utf-8"))

        let cart = {
                    id: randomUUID(),
                    products: []
                }

        carts.push(cart)
       

        await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2))

        res.status(200).json({ message: 'Cart created successfully', cart })

    }
    catch (error){

        console.error('Error creating cart:', error);
       
        res.status(500).json({ error: 'Internal server error' });
    }
})


  cartsRouter.post("/:cid/product/:pid", async (req, res) =>{

    try{
       let carts = JSON.parse(await fs.promises.readFile(cartPath, "utf-8"))

       let cartId = req.params.cid //id del carrito que viene por params
    
       let prodId = parseInt(req.params.pid) //id del producto que viene por params, parseado para comparar con el id numerico del producto
    
       
       let selectedCart = carts.find(cart => cart.id === cartId) // carrito seleccionado por id en los params
     
       let selectedProduct = getAllProducts.find(prod => prod.id === prodId) // producto seleccionado por el id de los params
        
       let quantity = 0 

       let productAdded = {
            product : selectedProduct.id,
            quantity:  quantity + 1
       }
       
       let isProductAdded = selectedCart.products.find(p => p.product === prodId) //comprobar que exista el producto 

       if (isProductAdded) {
        
           isProductAdded.quantity = isProductAdded.quantity + 1 // si el producto existe, reemplazamos la cantidad

            await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2))

       }else{

            selectedCart.products.push(productAdded) // si el producto no existe lo agregamos al carrito seleccionado

            await fs.promises.writeFile(cartPath, JSON.stringify(carts, null, 2))
       }
       res.send("productos agregados al carrito selecionado")

}
catch (error){
    
    console.error('Error:', error);
   
    res.status(500).json({ error: 'Internal server error' });
}

    
})
 