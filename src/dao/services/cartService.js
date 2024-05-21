import cartsRepository from "../repositories/carts.repository.js"


export default class CartService {

    constructor(){
        console.log("Trabajando con cartManager")
    }
    get = async()=>{
        try {
            let allCarts = await cartsRepository.get()
        return allCarts
            
        } catch (error) {
            console.log("error al obtener los carts")
        }
        
    }
    getById = async (id) => {
        try {
            let cart = await cartsRepository.getById(id)
            return cart
        } catch (error) {
            console.log(error, "no se encontro el carrito selecionado");
        }
        
    }

    createCart = async () => {
         try {
            let result = await cartsRepository.createCart()
            return result 
        }
        catch (error) {
            console.error("error al agregar el carrito", error)
        } 
        
    }

    addProduct = async (cid, pid) => {

        try {
           let newProduct = await cartsRepository.addProduct(cid, pid)
           return newProduct
        } catch (error) {
            console.error(error,"error al agregar el producto");
        }  
    }
    deleteProduct = async (cid, pid) => {
        try {
            let deletedProduct = await cartsRepository.deleteProduct(cid,pid)
        } catch (error) {
            console.log("No se pudo eliminar el producto");
        }
    }
    updateQuantity = async (cid, pid, quantity)=>{
        try {
            let updatedCart = await cartsRepository.updateQuantity(cid,pid,quantity)
            return updatedCart
            
        } catch (error) {
            console.log("error al modificar la cantidad");
        }

        
    }
    deleteAllProducts = async (cid)=>{
        try {
            let deleteAll = await cartsRepository.deleteAllProducts(cid)
            return deleteAll
        } catch (error) {
            console.log("error al eliminar los productos");
        }
        
    }
    addManyProducts = async (cid , newProducts) => {
        try {
            let manyProducts = await cartsRepository.addManyProducts(cid, newProducts)
            return manyProducts
        } catch (error) {
            console.log("error al agregar los productos");
        }
        

    }
     purchaseCart = async (cartId) => {
        try {
           let purchaseCart = await cartsRepository.purchaseCart(cartId)
           return purchaseCart
        } catch (error) {
            console.log("error al efectuar la compra del carrito");
        }
        

    }
 
}
