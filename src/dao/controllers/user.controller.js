import UserDTO from "../DTOs/user.dto.js";
import UserService from "../services/userService.js";
import logger from "../../../logger.js";
import { generateToken , validateToken } from "../../utils.js";
import nodemailer from "nodemailer";




const userDTO = new UserDTO()
const userService = new UserService()

class UserController{
    constructor(){

    }
    async register (req,res){
        res.status(201).send({ status: "success", message: "Usuario registrado" });
    }
    async login (req, res){
        try {
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
            
        } catch (error) {
            logger.error("Error al logear el usuario")
        }
    }
    async restore (req,res){
        try {
            const { email, password } = req.body;
            const userdata ={email, password}
            const user = await userService.getByEmail(email)

            if (user.password === password){

                return console.log("Error misma contraseña");//logger.error("Debe ingresar una contraseña distinta a la actual")
            } 
            
            await userService.updateUser(user.id, userdata)
            res.send({ status: "success", message: "Password actualizada" })
            
        } catch (error) {
            logger.error("Error al restaurar la contraseña")
        }
    }
    async logout (req,res){
        try {
            req.session.destroy(err=>{
                if(!err){
                    res
                    .status(200)
                    .redirect("/login")
                }else{
                    res.send({error: err})
                }
            })
        } catch (error) {
            logger.error("Error al cerrar sesion")
        }
        
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
        try {
            let currentUser = userDTO.get(req.session.user)
            req.session.user? res.send({status: "success", payload: currentUser}): res.send({message: "ususario no encontrado"})
        } catch (error) {
            logger.error("Error al obtener datos de sesión")
        }
    }
    async sendMail (req, res){
        try {
            const {email} = req.body
            if (!email) return res.status(404).send({status: "error", error: "No se encontro el usuario"})
            //const token = generateToken(email)

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

            const mail = await transport.sendMail({
                from: `${process.env.MAIL_USERNAME}`,
                to: email,
                subject: "Recuperación de Contraseña",
                html:` 
                    <p>Recuperar contraseña haciendo click en el boton</p>
                    <a href="http://localhost:8080/restore>Restaurar Contraseña</a>`,
            
              })

            res.status(200).send("Correo enviado exitosamente")
            
         } catch (error) {
            logger.error("No se pudo restaurar la contraseña")
        }  
    }
    async changeRole (req, res){
        try {
            const { email, role } = req.body
            const user = await userService.getByEmail(email)
            user.role = role
            
            res.status(200).send("Correo enviado exitosamente")

        } catch (error) {
            logger.error("Error al cambiar el rol")
        }
    } 
  
    
} 

export default new UserController();