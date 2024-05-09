import productModel from "../models/products.js"
import ProductManagerDB from "../services/productManagerDB.js"

const productsDB = new ProductManagerDB()
class ViewsController{
    constructor(){

    }
    async home (req,res){
        res.render("home", {getAllProducts, style: "home.css"})
    }
    async realtimeProducts (req, res){
        res.render("realTimeProducts",{style: "realTimeProducts.css"})
    }
    async chat (req,res){
        res.render("chat", {style: "chat.css"})
    }
    async products (req,res){
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
        let usuario = req.session.user
        console.log(usuario)
        

        const productsPAGINATE = await productModel.paginate(query, sort? optionsWithSort : options)

        productsPAGINATE.isValid = page >= 1 && page <= productsPAGINATE.totalPages;
        productsPAGINATE.nextLink = productsPAGINATE.hasNextPage? `http://localhost:8080/products?page=${productsPAGINATE.nextPage}`: "";
        productsPAGINATE.prevLink = productsPAGINATE.hasPrevPage? `http://localhost:8080/products?page=${productsPAGINATE.prevPage}`: "";
        productsPAGINATE.currentPage = page
        
        res.render("products",{ productsPAGINATE, user: req.session.user, style:"products.css"})
    }
    async cartById (req,res){
        let cid = req.params.cid

        let selectedCart = await cartsDB.getCartById(cid) 
       
        res.render("cart", {selectedCart, style:"cart.css"})
    }
    async productDetail (req,res){
        let pid = req.params.pid
        let result = await productsDB.getById(pid)
        
        res.render("productdetail",{ result, style:"productDetail.css"})
    }
    async register (req,res){
        res.render("register", {style:"register.css"})
    }
    async login (req,res){
        res.render("login", {style:"login.css"})
    }
    async restore (req,res){
        res.render('restore',{style: "restore.css"})
    }
} 

export default new ViewsController();