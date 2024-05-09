import { createHash, isValidPassword } from "../../utils.js";
import userModel from "../models/userModel.js";


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
              role: req.user.role
            };
            res.status(200).send({ status: "success", payload: req.user });
    }
    async restore (req,res){
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user)
            return res
            .status(400)
            .send({ status: "error", message: "No se encuentra el user" })

        const newPass = createHash(password);

        await userModel.updateOne({ _id: user._id }, { $set: { password: newPass } })

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
        req.session.user? res.send({status: "success",payload:req.session.user}): res.send({message: "ususario no encontrado"})
    }
    
} 

export default new UserController();