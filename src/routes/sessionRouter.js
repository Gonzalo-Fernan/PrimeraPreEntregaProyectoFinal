import { Router } from "express";
import userModel from "../dao/models/userModel.js";
import { auth } from "../middlewares/auth.js";
import { createHash, isValidPassword } from "../utils.js";


const sessionRouter = Router()
export default sessionRouter

sessionRouter.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !password || !age) {
        res.status(400).send({ status: "error", message: "Todos los campos deben ser completados" })
    }

    const exist = await userModel.findOne({ email: email });

    if (exist) {
        return res.status(400).send({ status: "error", error: "el correo ya existe" })
    }

    let role = email === "adminCoder@coder.com"? "admin" : "user"
    
    const user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        role
        }

    const result = await userModel.create(user);
    console.log(result);
    
    res.status(201).send({ staus: "success", payload: result })
})

sessionRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).send({ status: "error", error: "error en las credenciales" })
    }
    
    const validarPass = isValidPassword(user, password)
    
    if (!validarPass)
    return res.status(401).send({ error: "error", message: "Error de credenciales" })

//generamos la sesion
req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
}
delete user.password
        req.session.user = user
        res.send({
            status: "success",
            payload: req.session.user,
            message: "Inicio exitoso",
        })
})

sessionRouter.get("/logout", async (req,res) => {
    req.session.destroy(err=>{
        if(!err){
            res
            .status(200)
            .redirect("/login")
        }else{
            res.send({error: err})
        }
    })
})


