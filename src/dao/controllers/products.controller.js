import ProductService from "../services/productService.js";

const productService = new ProductService()

class ProductsController{
    constructor(){

    }
    async getAll (req,res){
        const productsPAGINATE = await productService.getAll(req.query)
        res.status(200).send({status: 'success', payload: productsPAGINATE})
    }
    async getById (req, res){
        let pid = req.params.pid
        let product = await productService.getById(pid)
        res.status(200).send({status: 'success', payload: product})
    }
    async addProduct(req,res){ 
        try {
            const requiredFields = ["title", "description", "thumbnail", "price", "code", "stock", "category", "status"]
            const missinFields = requiredFields.filter(field => !req.body[field])

            if(missinFields.length){
                return res.status(400).json({
                    status: "failure",
                    errorCode: "BAD_REQUEST",
                    description: "error al agregar el producto"
                })
            }
            let newProduct = req.body
            let productAdded = await productService.addProduct(newProduct)
            
            if (!productAdded) {
                return res.status(400).json({
                    status: "failure",
                    errorCode: "BAD_REQUEST",
                    description: "error al agregar el producto"
                })
            }

            res.status(201).json({status: 'success', payload: {
                message: `${productAdded.title} agregado exitosamente`,
                 product: productAdded
                }
            })
            
        } catch (error) {
            res.status(500).json({
                status: "failure",
                errorCode: "INTERNAL_SERVER_ERROR",
                description:"Error al agregar el producto"
            })
        }
    }
    async updateProduct (req,res){
        let pid = req.params.pid
        let body = req.body
    
        let updatedProduct = await productService.updateProduct(pid, body)
        res.status(200).send({status: 'success', payload: updatedProduct})
    }
    async deleteProduct (req,res){
        let pid = req.params.pid

        let productDeleted = await productService.deleteProduct(pid)
     
        res.status(200).send({status: 'success', payload: productDeleted})
    }
} 

export default new ProductsController();