import productModel from "../dao/models/products.js";
import ProductManagerDB from "../managers/products.manager.js";


class ProductsController{
    constructor(){

    }
    async getAll (req,res){
        let limit = req.query.limit? parseInt(req.query.limit) : 10
        let page = req.query.page? parseInt(req.query.page) : 1 
        let sort = req.query.sort
        let query = {} 
        let {category, status} = req.query
        if (category) {query.category = category}
        if (status){query.status= status}
        if (sort === "asc" ) { sort = 1}
        if (sort === "desc") {sort = -1}
    
        let optionsWithSort = {page, limit: limit,  sort: { price: sort } , lean:true}
        let options = {page, limit: limit, lean:true}
         
        // const productsPAGINATE = await productsDB.getAll(req.query)
        const productsPAGINATE = await productModel.paginate(query, sort? optionsWithSort : options)
        res.status(200).send({status: 'success', payload: productsPAGINATE})
    }
    async getById (req, res){
        const productsDB = new ProductManagerDB()
        let pid = req.params.pid
        let product = await productsDB.getById(pid)
    
        res.send(product)
    }
    async addProduct(req,res){
        let newProduct = req.body
        let productAdded = await productsDB.addProduct(newProduct)
    
        res.send(productAdded)
    }
    async updateProduct (req,res){
        let pid = req.params.pid
        let body = req.body
    
        let updatedProduct = await productsDB.updateProduct(pid, body)
        res.send(updatedProduct)
    }
    async deleteProduct (req,res){
        let pid = req.params.pid

        let productDeleted = await productsDB.deleteProduct(pid)
     
        res.send(productDeleted)
    }
} 

export default new ProductsController();