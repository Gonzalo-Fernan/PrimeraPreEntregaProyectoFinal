export default class UserDTO {
    constructor(){
        
    }
     get (user) {
        const newUser ={
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            cart: user.cart,
            role: user.role,
            last_connection: user.last_connection,
            id: user._id,
            }
        return newUser
    } 
}

