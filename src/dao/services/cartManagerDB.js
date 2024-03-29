import { isValidObjectId } from "mongoose"
import cartsModel from "../models/carts.js"


export default class CartManager {

    constructor(){
        console.log("Trabajando con cartManager")
    }
    allCarts = async()=>{
        let allCarts = await cartsModel.find().populate("products.product")
        return allCarts
    }

    getCartById = async (id) => {
        try {
            let cart = await cartsModel.findById(id).populate("products.product")
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

}
