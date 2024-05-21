import userModel from "../models/userModel.js";
import UserDTO from "../DTOs/user.dto.js";
import UserService from "../services/userService.js";


const userDTO = new UserDTO()
const userService = new UserService()

class UserController{
    constructor(){

    }
    async register (req,res){
        res.status(201).send({ status: "success", message: "Usuario registrado" });
    }
    async login (req, res){
        if(!req.user)return res.status(400).send('error')
        req.session.user = {
              first_name: req.user.first_name,
              last_name: req.user.last_name,
              email: req.user.email,
              age: req.user.age,
              role: req.user.role,
              cart: req.user.cart
            };
            res.status(200).send({ status: "success", payload: req.user });
    }
    async restore (req,res){
        const { email, password } = req.body;
        const userdata ={email, password}
        const user = await userModel.findOne({ email })

        await userService.updateUser(user.id, userdata)
        res.send({ status: "success", message: "Password actualizada" })
    }
    async logout (req,res){
        req.session.destroy(err=>{
            if(!err){
                res
                .status(200)
                .redirect("/login")
            }else{
                res.send({error: err})
            }
        })
    }
    async github (req,res){
        console.log("Solicitud enviada")
    }
    async githubCallback (req,res){
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        }
        res.redirect("/products") //ruta a la que redirigimos luego de iniciar sesión
    }
    async current (req,res){
        
        let currentUser = userDTO.get(req.session.user)

        req.session.user? res.send({status: "success",payload:currentUser}): res.send({message: "ususario no encontrado"})

    }
    
} 

export default new UserController();