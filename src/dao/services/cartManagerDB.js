import cartsModel from "../models/carts.js"



export default class CartManager {

    constructor(){
        console.log("Trabajando con cartManager")
    }
    allCarts = async()=>{
        let allCarts = await cartsModel.find()
        return allCarts
    }

    getCartById = async (id) => {
        try {
            let cart = await cartsModel.findById(id)
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
                cart.products.push({_id:pid, quantity:1})
                return await cart.save()
            }
        } catch (error) {
            console.error(error,"error en el agregado del producto");
        }  

/*          let cart = await cartsModel.findById(cid)
        let product = cart.products.find((product) => product.product.toString() === pid)

        if (product) {
            product.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        return await cart.save(); */
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

}

