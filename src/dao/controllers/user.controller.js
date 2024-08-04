import UserDTO from "../DTOs/user.dto.js";
import UserService from "../services/userService.js";
import logger from "../../../logger.js";
import nodemailer from "nodemailer";
import userModel from "../models/userModel.js";
import { sendEmail } from "../../config/mailer.config.js";




const userDTO = new UserDTO()
const userService = new UserService()

class UserController{
    constructor(){

    }
    async getAll(req,res){
         const allUsers = await userService.getAll()
         res.send(allUsers) 
    }
    async getById (req,res){
        const userId = req.params.uid
        const user = await userService.getById(userId)
        res.send(user)   
        console.log(user); 
    }
    async register (req,res){
        res.status(201).send({ status: "success", message: "Usuario registrado" });
    }
    async login (req, res){
        try {
            if(!req.user)return res.status(400).send('error')
            req.session.user = {
                  id: req.user._id,
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
        const {email, role} = req.body
        
        try {
            const user = await userService.getByEmail(email);
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        // Actualiza el rol del usuario
        await userModel.updateOne({ email: email }, { $set: { role: role } });

        // Responde con éxito
        res.status(200).send("Rol cambiado exitosamente");


        } catch (error) {
            logger.error("Error al cambiar el rol")
        }
    } 
    async updateToPremium (req,res){
        try {
            const userId = req.params.uid
            const user = await userService.updateToPremium(userId)

            res.status(200).json({
                status: "success",
                message: "Usuario actualizado a premium correctamente",
                user: user
            })
        } catch (error) {
            logger.error("Error al cambiar el usuario a Premium")
            res.status(500).json({
                status: "failure",
                message: "Error al actualizar usuario a premium"
            })
        }
    }
    async uploadDocuments (req, res){
        try {
            const userId = req.params.uid
            const files = req.files
            const user = await userService.uploadDocuments(userId, files)
            res.status(200).json({
                status: "success",
                message: "Documentos subidos correctamente",
                user: user
            })
        } catch (error) {
            logger.error(error) 
            res.status(500).json({
                status: "failure",
                message: "Error al subir documentos"
            })
        }
    }
    async delete(req,res){
        const email = req.params.uemail
        const userToDelete = await userService.deleteByEmail(email)
        res.status(200).json({
            status: "success",
            message: "Usuario eliminado correctamente",
            user: userToDelete
        })
   }
   async deleteUserWithNoConnection(req,res){
    try {
        const users = await userService.getAll()
        const usersToDelete = users.filter(async user => {
            // Fecha original en formato "dd/mm/yyyy, hh:mm:ss"
            const lastConnection = user.last_connection

            // Reorganizar la fecha al formato "mm/dd/yyyy hh:mm:ss"
            const [datePart, timePart] = lastConnection.split(', ')
            const [day, month, year] = datePart.split('/')
            const formattedDate = `${month}/${day}/${year} ${timePart}`

            // Convertir la fecha a un timestamp
            const timestamp = Date.parse(formattedDate)

            // Comparar con la fecha límite (hace dos días)
            const twoDaysAgo = Date.now() - (2 * 24 * 60 * 60 * 1000)
            if (timestamp < twoDaysAgo) {
                //aca se elimina a los que no se conectan hace mas de dos dias
                const deletedUser = await userService.deleteByEmail(user.email)
                const emailSubject = "Eliminación por inactividad"
                const emailBody = "<p>Se eliminó su cuenta por inactividad</p>"
                //sendEmail(user.email, emailSubject, emailBody)
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
                    to: user.email,
                    subject: emailSubject,
                    html: emailBody                
                  })   
            }
            })
            
            res.status(200).json({
                status: "success",
                message: "Usuarios sin conexión en los ultimos 2 dias eliminados correctamente" 
                })

    } catch (error) {
        logger.error("Error al intentar eliminar los usuarios")
    }
    
}
  
    
} 

export default new UserController();