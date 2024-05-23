export default class UserDTO {
    constructor(){
        
    }
     get (user) {
        const newUser ={
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            cart: user.cart,
            }
        return newUser
    } 
}

