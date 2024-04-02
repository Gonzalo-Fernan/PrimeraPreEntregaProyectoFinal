import  productModel  from "../models/products.js"

export default class ProductManagerDB {

    constructor(){
        console.log("Trabajando con productManager")
    }

    getAll = async () => {
            let products = await productModel.find()
            return products
    }
    getById = async (id) => {
        let result = await productModel.findById(id)
        return result
    }
    addProduct = async (product) => {
        let result = await productModel.create(product)
        return result
    }
    updateProduct = async (id, productData) => {
        let result = await productModel.updateOne({_id:id}, {$set: productData})
        return result
    }
    deleteProduct = async (id) => {
        let result = await productModel.deleteOne({_id:id})
        return result
    }

}