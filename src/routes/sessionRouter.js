import { Router } from "express";
import passport from "passport"
import userController from "../dao/controllers/user.controller.js";

const sessionRouter = Router()
export default sessionRouter

sessionRouter.post("/register",passport.authenticate("register", { failureRedirect: "/failregister" }), userController.register)
sessionRouter.get("/failregister", async (req, res) => {
    console.log("error");
    res.send({ error: "Falló" });
  }); 
sessionRouter.post('/login', passport.authenticate('login',{failureRedirect:"/faillogin"}), userController.login)
sessionRouter.get("/faillogin", async (req, res) => {
    console.log("error");
    res.send({ error: "Fallo" });
});
sessionRouter.post("/restore", userController.restore) 
sessionRouter.get("/logout", userController.logout)
// iniciar session con github
sessionRouter.get("/github",passport.authenticate("github", { scope: ["user:email"] }), userController.github);
//ruta que nos lleva a github login
sessionRouter.get("/githubcallback",passport.authenticate("github", { failureRedirect: "/login" }), userController.githubCallback);
sessionRouter.get("/current", userController.current)

