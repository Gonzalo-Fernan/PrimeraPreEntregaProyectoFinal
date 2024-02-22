import express from "express";
import productsRouter  from "./routes/productRouter.js"
import cartsRouter from "./routes/cartsRouter.js";


const app = express()

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use("/api/products/", productsRouter)
app.use("/api/carts/", cartsRouter)

const port = 8080

app.listen(port, () => console.log(`Servidor Levantado en puerto: ${port}`))