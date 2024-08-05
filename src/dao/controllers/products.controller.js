import logger from "../../../logger.js";
import ProductService from "../services/productService.js";
import nodemailer from "nodemailer";
import UserService from "../services/userService.js";

const productService = new ProductService()
const userService = new UserService()

class ProductsController{
    constructor(){

    }
    async getAll (req,res){
       
        try {
            const productsPAGINATE = await productService.getAll(req.query)
            res.status(200).send({status: 'success', payload: productsPAGINATE})
        } catch (error) {
            logger.error("Error al obtener los productos")
        }
    }
    async getById (req, res){
        try {
            let pid = req.params.pid
            let product = await productService.getById(pid)
            res.status(200).send({status: 'success', payload: product})
        } catch (error) {
            logger.error("Error al obtener el producto") 
        }
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
            const newProduct = req.body
            const userID = req.session.user.id
            newProduct.owner = userID
            
            let productAdded = await productService.addProduct(newProduct)
            
            if (!productAdded) {
                return res.status(400).json({
                    status: "failure",
                    errorCode: "BAD_REQUEST",
                    description: "error al agregar el producto"
                })
            }

            res.status(201).json({status: 'success', payload: {
                message: `${newProduct.title} agregado exitosamente`,
                 product: newProduct
                }
            }) 
            
        } catch (error) {
            logger.error("Error al agregar el producto")
            res.status(500).json({
                status: "failure",
                errorCode: "INTERNAL_SERVER_ERROR",
                description:"Error al agregar el producto"
            })
        }
    }
    async updateProduct (req,res){
        try {
            let pid = req.params.pid
            let body = req.body
            let updatedProduct = await productService.updateProduct(pid, body)
            res.status(200).send({status: 'success', payload: updatedProduct})
        } catch (error) {
            logger.error("Error al actualizar el producto")
        }
    }
    async deleteProduct (req,res){
        try {
            // aca si el producto esta creado por un usario premium enviarle un email con el aviso de que se elimino el producto
            let pid = req.params.pid
            const product = await productService.getById(pid)
            let productDeleted = await productService.deleteProduct(pid)
            const user = await userService.getById(product.owner)
            const role = user.role
            
            if (role === "premium") {
                const transport = nodemailer.createTransport({
                    service: "gmail",
                    host:"smtp.gmail.com",
                    secure: false,
                    port: 587,
                    auth:{
                    user:process.env.MAIL_USERNAME,
                    pass:process.env.MAIL_PASSWORD
                    }
                })

                const mail = transport.sendMail({
                    from: `${process.env.MAIL_USERNAME}`,
                    to: user.email,
                    subject: "Aviso de elimminación de producto",
                    html:` 
                        <p>El producto ${product.title} fue eliminado </p>`,
                })
            } 
            res.status(200).send({status: 'success', payload: productDeleted}) 
        } catch (error) {
            logger.error("Error al eliminar el producto seleccionado")
        }  
    } 
} 

export default new ProductsController();