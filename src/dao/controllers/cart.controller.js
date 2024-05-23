import CartService from "../services/cartService.js"

const cartsService = new CartService()

class CartsController{
    constructor(){

    }
    async get (req,res){
        let allCarts = await cartsService.get()
        res.status(200).send({status: 'success', payload: allCarts})
    }
    async getById (req, res){
        try {
            let cid = req.params.cid
            let selectedCart = await cartsService.getById(cid)
            res.status(200).send({status: 'success', payload: selectedCart})
            } 
        catch (error) {
                console.log("error");
            }
       
    }
    async add(req,res){
        let cid = req.params.cid
        let pid = req.params.pid
        let newProductInCart = await cartsService.addProduct(cid, pid)
        res.status(200).send({status: 'success', payload: newProductInCart})
    }
    async create(req,res){
        try {
            const newCart = await cartsService.createCart()
            res.status(200).send({status: 'success', payload: newCart})
        } catch (error) {
            console.error("Error al agregar el carrito:", error)
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
    
            console.log(error, "nose pudo actualizar la cantidad indicada")
            res.send("nose pudo actualizar la cantidad indicada")
    
        }
        
       
    }
    async delete (req,res){
        let cid = req.params.cid
        let pid = req.params.pid

        let deletedProduct = await cartsService.deleteProduct(cid, pid)
        res.status(200).send({status: 'success', payload: deletedProduct})
    }
    async deleteAll (req,res){
        try {
            let cid = req.params.cid
            let deleteAll = await cartsService.deleteAllProducts(cid)
            res.status(200).send({status: 'success', payload: deleteAll})
        } catch (error) {
            res.send(error, "no se pudieron eliminar los productos")
        }
    }
    async addMany (req, res){
        try {
            let cid = req.params.cid
            let newProducts = req.body
            let cartUpdated = await cartsService.addManyProducts(cid,newProducts)
            return res.status(200).send({status: 'success', payload: cartUpdated})
            
        } catch (error) {
            console.log("Error al intentar agregar varios podructos");
        }
    }
   async purchaseCart (req, res)  {
        const cartId = req.params.cid
        //const userId = req.session.user
        //console.log(userId.cart.user);

        try {
            const ticket = await cartsService.purchaseCart(cartId)
            return res.send(ticket)

        } catch (error) {
            return res.status(500).json({ error: "Error al realizar la compra"})
        }
    }
} 

export default new CartsController();