import express from "express";
import productsRouter  from "./routes/productRouter.js"
import cartsRouter from "./routes/cartsRouter.js";
import sessionRouter from "./routes/sessionRouter.js";
import __direname from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import viewsRouter from "./routes/viewsRouter.js"
import ProductManager from "./managers/products.manager.js";
import MessagesManager from "./dao/services/messagesManagerDB.js";
import ProductManagerDB from "./dao/services/productManagerDB.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initilizePassport from "./config/passport.config.js";
import dbConnection from "./config/db.config.js";

const app = express()
const port = 8080
const PATH = "./src/data/products.json"
const DB_URL= 'mongodb+srv://gondev:4822217@clustercoder.rfuiylg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCoder'
//conexion con la base de datos
dbConnection();

//Product Manager(fileSistem)
const products = new ProductManager(PATH)
const getAllProducts = await products.getProducts()
//Message Manager
const messages = new MessagesManager()
const getMessages = await messages.getMessages()
//Products DB
const productsDB = new ProductManagerDB()
const allProductsDB = await productsDB.getAll()

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

//Server
const server = app.listen(port, () => console.log(`Servidor Levantado en puerto: ${port}`))
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