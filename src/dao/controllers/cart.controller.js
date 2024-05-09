import CartManager from "../services/cartManagerDB.js"

const cartsDB = new CartManager()

class CartsController{
    constructor(){

    }
    async get (req,res){
        let allCarts = await cartsDB.allCarts()
        res.status(200).send({status: 'success', payload: allCarts})
    }
    async getById (req, res){
        try {
            let cid = req.params.cid
            let selectedCart = await cartsDB.getCartById(cid)
            res.status(200).send({status: 'success', payload: selectedCart})
            } 
        catch (error) {
                console.log("error");
            }
       
    }
    async add(req,res){
        let cid = req.params.cid
        let pid = req.params.pid
        let newProductInCart = await cartsDB.addProduct(cid, pid)
        res.status(200).send({status: 'success', payload: newProductInCart})
    }
    async create(req,res){
        try {
            const newCart = await cartsDB.createCart()
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
            
            const updated = await cartsDB.updateQuantity(cid, pid, quantity)
            res.status(200).send({status: 'success', payload: updated})
    
        } catch (error) {
    
            console.log(error, "nose pudo actualizar la cantidad indicada")
            res.send("nose pudo actualizar la cantidad indicada")
    
        }
        
       
    }
    async delete (req,res){
        let cid = req.params.cid
        let pid = req.params.pid

        let deletedProduct = await cartsDB.deleteProduct(cid, pid)
        res.status(200).send({status: 'success', payload: deletedProduct})
    }
    async deleteAll (req,res){
        try {
            let cid = req.params.cid
            let deleteAll = await cartsDB.deleteAllProducts(cid)
            res.status(200).send({status: 'success', payload: deleteAll})
        } catch (error) {
            res.send(error, "no se pudieron eliminar los productos")
        }
    }
    async addMany (req, res){
        try {
            let cid = req.params.cid
            let newProducts = req.body
            let cartUpdated = await cartsDB.addManyProducts(cid,newProducts)
            res.status(200).send({status: 'success', payload: deleteAll})
            
        } catch (error) {
            console.log("Error al intentar agregar varios podructos");
        }
    }
} 

export default new CartsController();