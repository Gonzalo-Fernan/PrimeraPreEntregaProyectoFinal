import  productModel  from "../models/products.js"

export default class ProductManagerDB {

    constructor(){
        console.log("Trabajando con productManager")
    }

    getAll = async () => {
        /* const {
            limit = 10, // default limit = 4
            page = 1, // default page = 1
            sort = null,
            query = null,
            category = null,
            status = null, //available
          } = params;

          console.log(limit);

          const options = {
            query: query,
            page: Number(page),
            limit: Number(limit),
            sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
            customLabels: {
              docs: "products",
              totalDocs: "totalProducts",
            },
          };
      
          let searchQuery = {};
      
          // $options: 'i' en MongoDB se utiliza para hacer que la búsqueda sea insensible a mayúsculas y minúsculas.
          if (query) {
            searchQuery.title = { $regex: query, $options: "i" };
          }
      
          if (category) {
            searchQuery.category = { $regex: category, $options: "i" };
          }
      
          if (status !== null) {
            searchQuery.status = status === "true";
          }
      
          const result = await productModel.paginate(searchQuery, options);
          return result; */
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

}