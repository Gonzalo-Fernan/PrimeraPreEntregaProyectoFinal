
const server = io()

const productsList = document.getElementById("productsConteiner")

server.on("products", (allProductsDB)=>{

     allProductsDB.forEach((product) => {
           productsList.innerHTML += `
                                
                <div class="products">
                    <h2>Nombre: ${product.title}</h2>
                    <li>id: ${product._id}</li>
                    <li>Descripcion: ${product.description}</li>
                    <li>Precio: ${product.price}</li>
                    <li>Imagen: ${product.thumbnail}</li>
                    <li>Codigo: ${product.code}</li>
                    <li>Stock: ${product.stock}</li>
                    <li>Status: ${product.status}</li>
                    <li>Categotia: ${product.category}</li>
                    <button class="detalle">Ir a detalle de producto</button>
                    <button class="agregar" >Agregar al carrito</button>                                         
                    <button class="eliminar">Eliminar Producto</button>
                </div>
            ` 
    })         
})
    