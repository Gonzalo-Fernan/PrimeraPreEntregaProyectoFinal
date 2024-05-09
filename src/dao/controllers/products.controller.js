import ProductManagerDB from "../services/productManagerDB.js";

const productsDB = new ProductManagerDB()

class ProductsController{
    constructor(){

    }
    async getAll (req,res){
        const productsPAGINATE = await productsDB.getAll(req.query)
        res.status(200).send({status: 'success', payload: productsPAGINATE})
    }
    async getById (req, res){
        let pid = req.params.pid
        let product = await productsDB.getById(pid)
        res.status(200).send({status: 'success', payload: product})
    }
    async addProduct(req,res){
        let newProduct = req.body
        let productAdded = await productsDB.addProduct(newProduct)
    
        res.status(200).send({status: 'success', payload: productAdded})
    }
    async updateProduct (req,res){
        let pid = req.params.pid
        let body = req.body
    
        let updatedProduct = await productsDB.updateProduct(pid, body)
        res.status(200).send({status: 'success', payload: updatedProduct})
    }
    async deleteProduct (req,res){
        let pid = req.params.pid

        let productDeleted = await productsDB.deleteProduct(pid)
     
        res.status(200).send({status: 'success', payload: productDeleted})
    }
} 

export default new ProductsController();