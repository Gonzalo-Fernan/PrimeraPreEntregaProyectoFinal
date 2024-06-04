import { Router } from "express";
import logger from "../../logger.js";

const loggerRouter = Router()


loggerRouter.get("/loggerTest", (req,res) =>{
    
    logger.debug("Este es un mensaje debug")
    logger.http("Este es un mensaje http")
    logger.info("Este es un mensaje info")
    logger.warn("Este es un mensaje warning")
    logger.error("Este es un mensaje error")
    logger.fatal("Este es un mensaje fatal")
    
    res.send("Log de prueba enviados") 
})

export default loggerRouter
