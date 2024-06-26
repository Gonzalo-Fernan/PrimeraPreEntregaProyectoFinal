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
        let result = await productModel.findById(id).lean()
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
        //buscar con categorias incluidas
    getAllProductsWithCategories = async () => {
        //lógica a implementar
        try {
            const products = productModel.find().populate("category")
            return products
            
        } catch (error) {
            console.log("Error al obtener los productos");
        }
    };
    
    //paginate
    getPaginatedProducts = async (page = 1, limit = 10) => {
        //lógica a implementar
        try {
            const options = {
                page: parseInt(page),
                limmit: parseInt(limit)
            }
            const products = await productModel.paginate({}, options);
            return products;
            
        } catch (error) {
            console.log("Error ");
        }
    };

}