const title = document.getElementById("title")
const description = document.getElementById("description")
const price = document.getElementById("price")
const thumbnail = document.getElementById("thumbnail")
const code = document.getElementById("code")
const stock = document.getElementById("stock")
const state = document.getElementById("status")
const category = document.getElementById("category")

const addForm = document.getElementById("productsForm")

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newProduct = {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value,
        status: state.value,
        category: category.value,
    };
    
    console.log(newProduct);
    
    fetch("/api/products/addProduct", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct) 
    }).then((response) => {
        if (response.ok) {
            console.log("Producto agregado con éxito a la base de datos");
        } else {
            console.log("Algo salió mal al intentar agregar un producto a la base de datos");
        }
    }).catch((error) => {
        console.error("Error en la solicitud:", error);
    });
});
