import ProductRepository from "../repositories/product.repository.js"

export default class ProductService {

    constructor(){
        console.log("Trabajando con productManager")
    }
    getAll = async (params) =>{
        try {
            const products = await ProductRepository.getAll(params)
            return products
        }
        catch (error) {
            throw new Error("Error al obtener los productos: " + error.message)
        }   
    }
    getById = async (id) => {
        try {
            let result = await ProductRepository.getById(id)
            return result
            
        } catch (error) {
            console.log("error al obterner el producto");
        }
    }
    addProduct = async (product) => {
        try {
            let result = await ProductRepository.addProduct(product)
            return result
            
        } catch (error) {
            console.log("error al agregar el producto");
        }
    }
    updateProduct = async (id, productData) => {
        try {
            let result = await ProductRepository.updateProduct(id, productData)
            return result 
        } catch (error) {
            console.log("error al actualizar el producto");
        }
        
    }
    deleteProduct = async (id) => {
        try {
            let result = await ProductRepository.deleteProduct(id)
            return result
        } catch (error) {
            console.log("error al eliminar el producto");
        }
       
    }
}