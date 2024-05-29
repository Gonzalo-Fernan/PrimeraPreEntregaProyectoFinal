import cartsMongoDao from "../../DAOs/Mongo/carts.mongo.dao.js"

export default class CartService {

    constructor(){
        console.log("Trabajando con cartManager")
    }
    get = async()=>{
        try {
            let allCarts = await cartsMongoDao.get()
        return allCarts
            
        } catch (error) {
            console.log("error al obtener los carts")
        }
        
    }
    getById = async (id) => {
        try {
            let cart = await cartsMongoDao.getById(id)
            return cart
        } catch (error) {
            console.log(error, "no se encontro el carrito selecionado");
        }
        
    }

    createCart = async () => {
         try {
            let result = await cartsMongoDao.createCart()
            return result 
        }
        catch (error) {
            console.error("error al agregar el carrito", error)
        } 
        
    }

    addProduct = async (cid, pid) => {

        try {
           let newProduct = await cartsMongoDao.addProduct(cid, pid)
           return newProduct
        } catch (error) {
            console.error(error,"error al agregar el producto");
        }  
    }
    deleteProduct = async (cid, pid) => {
        try {
            let deletedProduct = await cartsMongoDao.deleteProduct(cid,pid)
        } catch (error) {
            console.log("No se pudo eliminar el producto");
        }
    }
    updateQuantity = async (cid, pid, quantity)=>{
        try {
            let updatedCart = await cartsMongoDao.updateQuantity(cid,pid,quantity)
            return updatedCart
            
        } catch (error) {
            console.log("error al modificar la cantidad");
        }

        
    }
    deleteAllProducts = async (cid)=>{
        try {
            let deleteAll = await cartsMongoDao.deleteAllProducts(cid)
            return deleteAll
        } catch (error) {
            console.log("error al eliminar los productos");
        }
        
    }
    addManyProducts = async (cid , newProducts) => {
        try {
            let manyProducts = await cartsMongoDao.addManyProducts(cid, newProducts)
            return manyProducts
        } catch (error) {
            console.log("error al agregar los productos");
        }
        

    }
     purchaseCart = async (cartId) => {
        try {
           let purchaseCart = await cartsMongoDao.purchaseCart(cartId)
           return purchaseCart
        } catch (error) {
            console.log("error al efectuar la compra del carrito");
        }
        

    }
 
}
