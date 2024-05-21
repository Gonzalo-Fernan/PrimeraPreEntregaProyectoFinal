import cartsModel from "../models/carts.js";
import { isValidObjectId } from "mongoose";
import productRepository from "./product.repository.js";
import Ticket from "../models/tickectModel.js"
import { randomCode } from "../../utils.js";
import UserService from "../services/userService.js";

class CartRepository {
    constructor(){

    }
    get = async()=>{
        let allCarts = await cartsModel.find().populate("products.product")
        return allCarts
    }
    getById = async (id) => {
        try {
            let cart = await cartsModel.findById(id).populate("products.product").lean()
            return cart
        } catch (error) {
            console.log(error, "no se encontro el carrito selecionado");
        }
        
    }

    createCart = async () => {
         try {
            let result = await cartsModel.create({})
            return result 
        }
        catch (error) {
            console.error("error al agregar el carrito", error)
        } 
        
    }

    addProduct = async (cid, pid) => {

        try {
            let cart = await cartsModel.findById(cid)
            let productIndex = cart.products.findIndex(product => product._id.equals(pid))
            if (productIndex !== -1) {
                cart.products[productIndex].quantity++
                return await cart.save()
            } else{
                cart.products.push({_id:pid, quantity:1, product: pid})
                return await cart.save()
            }
        } catch (error) {
            console.error(error,"error en el agregado del producto");
        }  
    }
    deleteProduct = async (cid, pid) => {
        let cart = await cartsModel.findById(cid)
        let product = cart.products.findIndex((product) => product.product.toString() === pid)

        if(product === 0){
            console.log("Producto no encontrado")
        }else{
            cart.products.splice(product,1)
        }

        return await cart.save();
    }
    updateQuantity = async (cid, pid, quantity)=>{
        
        let updatedCart = await cartsModel.updateOne({_id:cid, "products._id":pid},{$set:{"products.$.quantity": quantity}})

        return updatedCart
        
    }
    deleteAllProducts = async (cid)=>{
        
        let deleteAll = cartsModel.updateOne({ _id: cid }, { $set: { products: [] } })
        return deleteAll
    }
    addManyProducts = async (cid , newProducts) => {
        if (isValidObjectId(cid)) {
            let cartUpdated = await cartsModel.updateOne({ _id: cid },{ $set: { products: newProducts } })
        
            return cartUpdated
        }else{
            console.log(error,"el id ingresado no pertenece a un carrito");
        }
        

    }
     purchaseCart = async (cartId) => {
        //const user = await UserService.getById(userId)
        
        try {

            const cart = await cartsModel.findById(cartId)
            const totalAmount = 0
            const productsToPurchase = []
            const productsToKeepInCart = []

            cart.products.forEach((product)=>{

              if(product.quantity < product.product.stock){

                const newStock = product.product.stock - product.quantity

                productsToPurchase.push(product)

                productRepository.updateProduct(product._id, {stock: newStock})

                totalAmount + product.product.price
                
              }
              //si no hay suficiente stock, el producto queda en el carrito y no se compra
              if (product.quantity > product.product.stock){
                productsToKeepInCart.push(product._id)
              }
            })
            
            const ticket = new Ticket({
                code: randomCode(10),
                purchaseDatetime: new Date(),
                amount: totalAmount,
                purchaser: "664d059e20844980baa5d80a"
            })

            await ticket.save()
            console.log(ticket);
            console.log(cart.products);
            console.log(productsToPurchase);

        }catch (error) {
            console.log(error, "no se pudo efectuar la compra")
            console.log(cart)
            console.log(cartId)
        }
    } 
       
}
export default new CartRepository()