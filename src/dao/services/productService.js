import productsMongoDao from "../../DAOs/Mongo/products.mongo.dao.js"

export default class ProductService {

    constructor(){
        console.log("Trabajando con productManager")
    }
    getAll = async (params) =>{
        try {
            const products = await productsMongoDao.getAll(params)
            return products
        } catch (error) {
            console.log("Error al obtener los productos");
        }
    }
    getById = async (id) => {
        try {
            let result = await productsMongoDao.getById(id)
            return result
            
        } catch (error) {
            console.log("error al obterner el producto");
        }
    }
    addProduct = async (product) => {
        try {
            let result = await productsMongoDao.addProduct(product)
            return result
            
        } catch (error) {
            console.log("error al agregar el producto");
        }
    }
    updateProduct = async (id, productData) => {
        try {
            let result = await productsMongoDao.updateProduct(id, productData)
            return result 
        } catch (error) {
            console.log("error al actualizar el producto");
        }
        
    }
    deleteProduct = async (id) => {
        try {
            let result = await productsMongoDao.deleteProduct(id)
            return result
        } catch (error) {
            console.log("error al eliminar el producto");
        }
       
    }
}