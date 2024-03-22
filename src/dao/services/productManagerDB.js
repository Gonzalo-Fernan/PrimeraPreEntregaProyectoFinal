import productsModel from "../models/products.js"

export default class ProductManagerDB {

    constructor(){
        console.log("Trabajando con productManager")
    }

    getAll = async (limit) => {
         if (limit) {
            let result = await productsModel.find().limit(limit)
            return result
        }else{
            let products = await productsModel.find()
            return products
        } 
        
    }
    getById = async (id) => {
        let result = await productsModel.findById(id)
        return result
    }
    addProduct = async (product) => {
        let result = await productsModel.create(product)
        return result
    }
    updateProduct = async (id, productData) => {
        let result = await productsModel.updateOne({_id:id}, {$set: productData})
        return result
    }
    deleteProduct = async (id) => {
        let result = await productsModel.deleteOne({_id:id})
        return result
    }

}