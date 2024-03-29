/* import fs from "fs";
import ProductManager from "../managers/products.manager.js";
import { randomUUID } from "crypto"; */
import { Router } from "express";
import cartManager from "../dao/services/cartManagerDB.js"



const cartsRouter = Router()
export default cartsRouter

/* const PATH = "./src/data/products.json"
const cartPath = "./src/data/carts.json"
const products = new ProductManager(PATH)
const getAllProducts = await products.getProducts() */
const cartDB = new cartManager()

//Aceder a todos los carritos
cartsRouter.get("/", async (req, res) =>{

    let allCarts = await cartDB.allCarts()
    res.send(allCarts)

/*     let allCarts =  JSON.parse(await fs.promises.readFile(cartPath, "utf-8"))
   
    res.send(allCarts)
 */
    
}) 
//Acceder al carrito seleccionado
cartsRouter.get("/:cid/", async (req, res) =>{
/*     const querySort = req.query
    const pipeline = [
        {
            $sort: {price: 1}
        }
    ] */
/*     if (querySort) {
        const sort = await cartsModel.find().aggregate(pipeline)
        console.log(sort)
        return sort
    }else{ */
        try {
        let cid = req.params.cid

       let selectedCart = await cartDB.getCartById(cid)
        res.send(selectedCart)

        } catch (error) {
        console.log("error");
        }
    //}

    
   

    /* let cartID = req.params.cid

    let carts = JSON.parse(await fs.promises.readFile(cartPath, "utf-8"))

    let selectedCart = carts.find(cart => cart.id === cartID)

    res.send(selectedCart.products)
 */
    
})
//Agregar un carrito nuevo
cartsRouter.post("/", async (req, res) =>{
    try {
        const newCart = await cartDB.createCart()
        res.send(newCart)
    } catch (error) {
        console.error("Error al agregar el carrito:", error)
    }

    /* let newCart = await cartDB.createCart()
    res.send(newCart) */

   /*  try{
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
    } */
})
//Agregar un producto al carrito seleccionado
  cartsRouter.post("/:cid/products/:pid", async (req, res) =>{

    let cid = req.params.cid
    let pid = req.params.pid
    
   
    let newProductInCart = await cartDB.addProduct(cid, pid)
    res.send(newProductInCart)


   /*  try{
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
} */

    
})
//Eliminar un producto del carrito seleccionado 
cartsRouter.delete("/:cid/products/:pid", async (req, res) =>{

    let cid = req.params.cid
    let pid = req.params.pid

    let deletedProduct = await cartDB.deleteProduct(cid, pid)
    res.send("producto eliminado")

})
//Eliminar TODOS los productos de un carrito
cartsRouter.delete("/:cid", async (req, res) =>{
    try {
        let cid = req.params.cid
        let deleteAll = await cartDB.deleteAllProducts(cid)
        res.send("todos los productos han sido eliminados")
    } catch (error) {
        res.send(error, "no se pudieron eliminar los productos")
    }
    

})
//Actualizar la cantidad de un producto en un carrito
cartsRouter.put("/:cid/products/:pid", async (req, res)=>{
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let quantity = req.body.quantity
        
        await cartDB.updateQuantity(cid, pid, quantity)
        res.send("cantidad actualizada")

    } catch (error) {

        console.log(error, "nose pudo actualizar la cantidad indicada")
        res.send("nose pudo actualizar la cantidad indicada")

    }
    
   
    
})
//
cartsRouter.put("/:cid", async (req, res)=>{
    let cid = req.params.cid
    let newProducts = req.body
    let cartUpdated = await cartDB.addManyProducts(cid,newProducts)
    res.send("productos actualizados en el carrito")
})