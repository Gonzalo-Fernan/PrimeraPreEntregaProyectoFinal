export default class ProductsDTO {
    constructor(){
        
    }
    get (cart) {
        const newCart ={
            _id: cart._id,
            user: cart.user,
            products: cart.products,
            quantity: cart.quantity
            }
        return newCart
    }
}