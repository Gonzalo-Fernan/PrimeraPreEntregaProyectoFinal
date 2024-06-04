import logger from "../../../logger.js"
import CartService from "../services/cartService.js"

const cartsService = new CartService()

class CartsController{
    constructor(){

    }
    async get (req,res){
        try {
            let allCarts = await cartsService.get()
            res.status(200).send({status: 'success', payload: allCarts})
        } catch (error) {
            logger.error("Error al obtener los carritos")
        }
    }
    async getById (req, res){
        try {
            let cid = req.params.cid
            let selectedCart = await cartsService.getById(cid)
            res.status(200).send({status: 'success', payload: selectedCart})
            } 
        catch (error) {
               logger.error("Error al obtener el carrito seleccionado") 
            }
       
    }
    async add(req,res){
        try {
            let cid = req.params.cid
            let pid = req.params.pid
            let newProductInCart = await cartsService.addProduct(cid, pid)
            res.status(200).send({status: 'success', payload: newProductInCart}) 
        } catch (error) {
            logger.error("Error al agregar el producto al carrito")
        }
    }
    async create(req,res){
        try {
            const newCart = await cartsService.createCart()
            res.status(200).send({status: 'success', payload: newCart})
        } catch (error) {
            logger.error(error, "Error al crear el carrito") 
        }
    
        
    }
    async update (req,res){
        try {
            let cid = req.params.cid
            let pid = req.params.pid
            let quantity = req.body.quantity
            
            const updated = await cartsService.updateQuantity(cid, pid, quantity)
            res.status(200).send({status: 'success', payload: updated})
    
        } catch (error) {
            logger.error("Error al actualizar la cantidad")
        }
        
       
    }
    async delete (req,res){
        try {
            let cid = req.params.cid
            let pid = req.params.pid
    
            let deletedProduct = await cartsService.deleteProduct(cid, pid)
            res.status(200).send({status: 'success', payload: deletedProduct})    
        } catch (error) {
            logger.error("Error al eliminar el carrito seleccionado")
        }
    }
    async deleteAll (req,res){
        try {
            let cid = req.params.cid
            let deleteAll = await cartsService.deleteAllProducts(cid)
            res.status(200).send({status: 'success', payload: deleteAll})
        } catch (error) {
            logger.error("Error al eliminar los carritos")
        }
    }
    async addMany (req, res){
        try {
            let cid = req.params.cid
            let newProducts = req.body
            let cartUpdated = await cartsService.addManyProducts(cid,newProducts)
            return res.status(200).send({status: 'success', payload: cartUpdated})
            
        } catch (error) {
            logger.error("Error al agregar los productos")
        }
    }
   async purchaseCart (req, res)  {
        const cartId = req.params.cid
        
        try {
            const ticket = await cartsService.purchaseCart(cartId)
            return res.send(ticket)

        } catch (error) {
            logger.error("Error al efectuar la compra del carrito")
        }
    }
} 

export default new CartsController();