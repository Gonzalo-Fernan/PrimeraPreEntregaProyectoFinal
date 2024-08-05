import logger from "../../../logger.js"
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
            logger.error("Error al obtener los carts")
        }
         
    }
    getById = async (id) => {
        try {
            let cart = await cartsMongoDao.getById(id)
            return cart
            
        } catch (error) {
            logger.error("Error al obterner el carrito")
        }
    }
    createCart = async () => {
        try {
            let result = await cartsMongoDao.createCart()
            return result 
            
        } catch (error) {
            logger.error("Error al crear el carrito")
        }
    }
    addProduct = async (cid, pid) => {
        try {
            let newProduct = await cartsMongoDao.addProduct(cid, pid)
            return newProduct
            
        } catch (error) {
            logger.error("Error al agregar el producto al carrito")
        }
    }
    deleteProduct = async (cid, pid) => {
        try {
            let deletedProduct = await cartsMongoDao.deleteProduct(cid,pid)
            return deletedProduct
        } catch (error) {
            logger.error("Error al eliminar el producto del carrito")
        }
    }
    updateQuantity = async (cid, pid, quantity)=>{
        try {
            let updatedCart = await cartsMongoDao.updateQuantity(cid,pid,quantity)
            return updatedCart 
        } catch (error) {
            logger.error("Error al actualizar la cantidad de producto al carrito")
        }
        
    }
    deleteAllProducts = async (cid)=>{
        try {
            let deleteAll = await cartsMongoDao.deleteAllProducts(cid)
        return deleteAll
        } catch (error) {
            logger.error("Error al eliminar todos los productos del carrito")
        }
        
    }
    addManyProducts = async (cid , newProducts) => {
        try {
            let manyProducts = await cartsMongoDao.addManyProducts(cid, newProducts)
            return manyProducts     
        } catch (error) {
            logger.error("Error al agregar varios productos al carrito")
        }
        
    }
    purchaseCart = async (cartId) => {
        try {
            let purchaseCart = await cartsMongoDao.purchaseCart(cartId)
            return purchaseCart
            
        } catch (error) {
            logger.error("Error al ejecutarse la compra del carrito")
        }
    }
 
}
