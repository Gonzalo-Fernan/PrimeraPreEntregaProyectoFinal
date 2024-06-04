import productsMongoDao from "../../DAOs/Mongo/products.mongo.dao.js"

export default class ProductService {

    constructor(){
        console.log("Trabajando con productManager")
    }
    getAll = async (params) =>{
        const products = await productsMongoDao.getAll(params)
        return products
        
    }
    getById = async (id) => {
        let result = await productsMongoDao.getById(id)
        return result     
    }
    addProduct = async (product) => {
        let result = await productsMongoDao.addProduct(product)
        return result  
    }
    updateProduct = async (id, productData) => {
        let result = await productsMongoDao.updateProduct(id, productData)
        return result 
    }
    deleteProduct = async (id) => {
        let result = await productsMongoDao.deleteProduct(id)
        return result
    }
}