import { Router } from "express";
import ProductManager from "../managers/products.manager.js";
import productModel from "../dao/models/products.js";
import cartModel from "../dao/models/carts.js";
import CartManager from "../dao/services/cartManagerDB.js";
import ProductManagerDB from "../dao/services/productManagerDB.js";
const router = Router()

/* 
const PATH = "./src/data/products.json"
const products = new ProductManager(PATH)
const getAllProducts = await products.getProducts() */
const cartsDB = new CartManager()
const productsDB = new ProductManagerDB()

router.get("/home",(req,res)=>{

    res.render("home", {getAllProducts, style: "home.css"})
    
})

router.get("/realtimeproducts",(req,res)=>{ 

    res.render("realTimeProducts",{style: "realTimeProducts.css"})

})
router.get("/chat",(req, res)=>{
    res.render("chat", {style: "chat.css"})
})

 router.get("/products", async(req, res)=>{
    let limit = req.query.limit? parseInt(req.query.limit) : 10
    let page = req.query.page? parseInt(req.query.page) : 1 
    let sort = req.query.sort
    let query = {} 
    let {category, status} = req.query
    if (category) {query.category = category}
    if (status){query.status= status}
    if (sort === "asc" ) { sort = 1}
    if (sort === "desc") {sort = -1}
    let optionsWithSort = {page, limit: 4,  sort: { price: sort } , lean:true}
    let options = {page, limit: 4, lean:true}
   
     

    const productsPAGINATE = await productModel.paginate(query, sort? optionsWithSort : options)

    productsPAGINATE.isValid = page >= 1 && page <= productsPAGINATE.totalPages;
    productsPAGINATE.nextLink = productsPAGINATE.hasNextPage? `http://localhost:8080/products?page=${productsPAGINATE.nextPage}`: "";
    productsPAGINATE.prevLink = productsPAGINATE.hasPrevPage? `http://localhost:8080/products?page=${productsPAGINATE.prevPage}`: "";
    productsPAGINATE.currentPage = page
    
    res.render("products",{ productsPAGINATE ,style:"products.css"})
}) 
router.get("/cart/:cid",async(req, res)=>{
    let cid = req.params.cid

    let selectedCart = await cartsDB.getCartById(cid) 
   
    res.render("cart", {selectedCart, style:"cart.css"})
})

router.get("/products/:pid", async(req, res)=>{

    let pid = req.params.pid
    let result = await productsDB.getById(pid)
    
    res.render("productdetail",{ result, style:"productDetail.css"})
}) 



export default router




















/* router.post("/realtimeproducts", (req,res)=>{
 
    let newProduct = req.body
    console.log(newProduct);
     
    products.addProduct(newProduct)

    res.send("producto agregado")  
}) 
  */