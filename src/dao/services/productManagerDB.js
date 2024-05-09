import  productModel  from "../models/products.js"

export default class ProductManagerDB {

    constructor(){
        console.log("Trabajando con productManager")
    }
    getAll = async (params) =>{
        try {
            const {
                limit = 10,
                page = 1,
                sort,
                category,
                status
            } = params
    
            //paginación.
            const options = {limit, page, lean : true}
    
            //ordenamiento.
            if (sort && (sort === 'asc' || sort === 'desc')) {
                options.sort = { price: sort === 'asc' ? 1 : -1 }
            }
    
            //filtro query.
            const query = {}
            category && (query.category = category)
            status && (query.status = status)
    
            
            //Consulta a la base de datos. Retorna un objeto con los productos y la información de paginación.
            const result = await productModel.paginate(query, options)
            return result

        } catch (error) {
            return console.log("Error al cargar los datos")
        }
        
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
    }
}