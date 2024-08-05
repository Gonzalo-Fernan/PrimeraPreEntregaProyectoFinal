import logger from "../../../logger.js";
import productsMongoDao from "../../DAOs/Mongo/products.mongo.dao.js";


export default class ProductService {

    constructor(){
        console.log("Trabajando con productManager")
    }
    getProducts = async (id) => {
        try {
            let result = await productsMongoDao.getProducts()
            return result
            
        } catch (error) {
            logger.error("Error al obterner los productos")
        }
    }
    getAll = async (params) =>{
        try {
            const products = await productsMongoDao.getAll(params)
            return products
        } catch (error) {
            logger.error("Error al obtener los productos")
        }
    }
    getById = async (id) => {
        try {
            let result = await productsMongoDao.getById(id)
            return result        
        } catch (error) {
            logger.error("Error al obtener el producto")
        }
    }
    addProduct = async (product) => {
        try {
            let result = await productsMongoDao.addProduct(product)
            return result  
            
        } catch (error) {
            logger.error("Error al agrega el producto")
        }
    }
    updateProduct = async (id, productData) => {
        try {
            let result = await productsMongoDao.updateProduct(id, productData)
            return result 
            
        } catch (error) {
            logger.error("Error al actualizar el producto")
        }
    }
    deleteProduct = async (id) =>{
        try {
            let result = await productsMongoDao.deleteProduct(id)
            return result
            
        } catch (error) {
            logger.error("Error al eliminar el producto")
        }
    }

}