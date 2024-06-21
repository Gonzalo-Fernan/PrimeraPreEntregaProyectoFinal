import express from "express";
import productsRouter  from "./routes/productRouter.js"
import cartsRouter from "./routes/cartsRouter.js";
import sessionRouter from "./routes/sessionRouter.js";
import viewsRouter from "./routes/viewsRouter.js"
import session from "express-session";
import __direname from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import ProductManager from "./managers/products.manager.js";
import MessageService from "./dao/services/messageService.js";
import ProductService from "./dao/services/productService.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import initilizePassport from "./config/passport.config.js";
import dbConnection from "./config/db.config.js";
import loggerRouter from "./routes/loggerRouter.js";
import mailerRouter from "./routes/mailerRouter.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import logger from "../logger.js";

const app = express()
const PATH = "./src/data/products.json"
const DB_URL= 'mongodb+srv://gondev:4822217@clustercoder.rfuiylg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCoder'
//conexion con la base de datos
dbConnection();

//Product Manager(fileSistem)
const products = new ProductManager(PATH)
const getAllProducts = await products.getProducts()
//Message Manager
const messages = new MessageService()
const getMessages = await messages.getMessages()
//Products DB
const productsDB = new ProductService()
const allProductsDB = await productsDB.getAll()

//swagger
const swaggerOptions = {
  definition: {
      openapi: "3.0.1",
      info: {
          title: "API Otherness",
          description: "API para adquirir productos de merceria y maquinas de coser online"
      }
  }, 
  apis: [`${__direname}/src/docs/**/*.yaml`]
} 

const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs, {
  customCss: ".swagger-ui .topbar {display: none}"
}));

//Middlewares
app.use(express.static(__direname +"/public"))
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.set("views", `${__direname}/src/views`)
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.use(cookieParser())
app.use(session({
      store: new MongoStore({
        mongoUrl: DB_URL,
        ttl: 3600,
      }),
      secret: "Secret",
      resave: false,
      saveUninitialized: false,
    })
  );

//usando passport
initilizePassport()
app.use(passport.initialize())
app.use(passport.session()) 


//Routes
app.use("/api/products/", productsRouter)
app.use("/api/carts/", cartsRouter)
app.use(viewsRouter)
app.use("/api/sessions/", sessionRouter)
app.use("/", loggerRouter)
app.use("/api/mailer/", mailerRouter)

//Server
const server = app.listen(process.env.PORT, () => console.log(`Servidor Levantado en puerto: ${process.env.PORT}`))
const io = new Server(server)


//Socket Server
io.on("connection", (socket) => {

    // emitimos la lista de productos hacia el cliente (realTimeProducts.js)
    socket.emit("allProducts", getAllProducts) 
    
    socket.on("addProduct", async(newProduct)=>{
        // recibimos el nuevo producto que viene del formulario y lo agregamos a la lista de productos 
        await products.addProduct(newProduct) 
        
    })
    
    socket.on("delete",async(productId)=>{
        //recibimos el id del producto a eliminar y los parseamos para eliminar el producto
       await products.deleteProduct(parseInt(productId)) 
    })

    socket.on("newMessage",async (newMessage) => {

        await messages.addNewMessage(newMessage)
       
        io.emit("newMessage", newMessage)

    })
 
   

})