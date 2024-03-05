
const server = io()

//traemos todos los valores del formulario para agregar un producto
const title = document.getElementById("title")
const description = document.getElementById("description")
const price = document.getElementById("price")
const thumbnail = document.getElementById("thumbnail")
const code = document.getElementById("code")
const stock = document.getElementById("stock")
const state = document.getElementById("status")
const category = document.getElementById("category")

//traemos el formulario de agregar producto y el de eliminar
const addForm = document.getElementById("productsForm")
const deleteForm = document.getElementById("delete")

// traemos el contenedor donde se va mostrar la lista de productos 
const list = document.getElementById("list")

//agregamos el evento submit en el formulario para agregar productos
addForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    const newProduct = {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value,
        status: state.value,
        category: category.value
    }
    server.emit('addProduct', newProduct)

    list.innerHTML = "" 

}) 

//agregamos el evento submit en el formulario para eliminar productos
deleteForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    
    let productId = document.getElementById("productId").value
    
    server.emit('delete', productId)

    list.innerHTML = ""
    
})
//escuchamos el emit del app.js para mortrar el listado de productos 
 server.on("allProducts", (getAllProducts)=>{
    
    getAllProducts.forEach((p) =>{
        list.innerHTML += `
                <div class="productos">
                <li>id: ${p.id}</li>
                <li>Nombre: ${p.title}</li>
                <li>Descripcion: ${p.description}</li>
                <li>Precio: ${p.price}</li>
                <li>Imagen: ${p.thumbnail}</li>
                <li>Codigo: ${p.code}</li>
                <li>Stock: ${p.stock}</li>
                <li>Status: ${p.status}</li>
                <li>Categotia: ${p.category}</li>                                        
                </div>
            ` })
    
 })    










   




 






