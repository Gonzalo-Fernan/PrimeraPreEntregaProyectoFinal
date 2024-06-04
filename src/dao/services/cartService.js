import cartsMongoDao from "../../DAOs/Mongo/carts.mongo.dao.js"


export default class CartService {

    constructor(){
        console.log("Trabajando con cartManager")
    }
    get = async()=>{
        let allCarts = await cartsMongoDao.get()
        return allCarts  
    }
    getById = async (id) => {
            let cart = await cartsMongoDao.getById(id)
            return cart
    }
    createCart = async () => {
        let result = await cartsMongoDao.createCart()
        return result 
    }
    addProduct = async (cid, pid) => {
        let newProduct = await cartsMongoDao.addProduct(cid, pid)
        return newProduct
    }
    deleteProduct = async (cid, pid) => {
        let deletedProduct = await cartsMongoDao.deleteProduct(cid,pid)
    }
    updateQuantity = async (cid, pid, quantity)=>{
        let updatedCart = await cartsMongoDao.updateQuantity(cid,pid,quantity)
        return updatedCart 
    }
    deleteAllProducts = async (cid)=>{
        let deleteAll = await cartsMongoDao.deleteAllProducts(cid)
        return deleteAll
    }
    addManyProducts = async (cid , newProducts) => {
        let manyProducts = await cartsMongoDao.addManyProducts(cid, newProducts)
        return manyProducts 
    }
    purchaseCart = async (cartId) => {
        let purchaseCart = await cartsMongoDao.purchaseCart(cartId)
        return purchaseCart
    }
 
}
