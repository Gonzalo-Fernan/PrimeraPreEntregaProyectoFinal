import express from "express";
import productsRouter  from "./routes/productRouter.js"
import cartsRouter from "./routes/cartsRouter.js";
import __direname from "./utils.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import viewsRouter from "./routes/viewsRouter.js"
import ProductManager from "./managers/products.manager.js";

const app = express()
const port = 8080
const PATH = "./src/data/products.json"

const products = new ProductManager(PATH)
const getAllProducts = await products.getProducts()

//middlewares
app.use(express.static(__direname +"/public"))
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.set("views", `${__direname}/src/views`)
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")

app.use("/api/products/", productsRouter)
app.use("/api/carts/", cartsRouter)
app.use(viewsRouter)

const server = app.listen(port, () => console.log(`Servidor Levantado en puerto: ${port}`))
const io = new Server(server)

io.on("connection", (socket) => {

    // emitimos la lista de productos hacia el cliente (realTimeProducts.js)
    socket.emit("allProducts", getAllProducts) 
    
    socket.on("addProduct", async(newProduct)=>{
        // recibimos el nuevo producto que viene del formulario y lo agregamos a la lista de productos 
        await products.addProduct(newProduct) 
        
    })
    
    socket.on("delete",(productId)=>{
        //recibimos el id del producto a eliminar y los parseamos para eliminar el producto
        products.deleteProduct(parseInt(productId)) 
    })

})