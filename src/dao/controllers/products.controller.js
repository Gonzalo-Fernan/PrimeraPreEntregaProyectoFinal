import ProductService from "../services/productService.js";

const productService = new ProductService()

class ProductsController{
    constructor(){

    }
    async getAll (req,res){
        const productsPAGINATE = await productService.getAll(req.query)
        res.status(200).send({status: 'success', payload: productsPAGINATE})
    }
    async getById (req, res){
        let pid = req.params.pid
        let product = await productService.getById(pid)
        res.status(200).send({status: 'success', payload: product})
    }
    async addProduct(req,res){
        try {
            let newProduct = req.body
            let productAdded = await productService.addProduct(newProduct)
        
            res.status(200).send({status: 'success', payload: productAdded})
            
        } catch (error) {
            res.send({status: 'fail'})
            console.log("no se pudo agregar el producto");
        }
    }
    async updateProduct (req,res){
        let pid = req.params.pid
        let body = req.body
    
        let updatedProduct = await productService.updateProduct(pid, body)
        res.status(200).send({status: 'success', payload: updatedProduct})
    }
    async deleteProduct (req,res){
        let pid = req.params.pid

        let productDeleted = await productService.deleteProduct(pid)
     
        res.status(200).send({status: 'success', payload: productDeleted})
    }
} 

export default new ProductsController();