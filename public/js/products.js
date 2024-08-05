document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll(".agregar");

    addToCartButtons.forEach((button) => {
        const productId = button.getAttribute("data-prod");
        const cartId = button.getAttribute("data-cart");
        button.addEventListener("click", () => {
            
            Swal.fire({
                title: 'Producto agregado al carrito',
                text: 'Ingresá a tu carrito para ver tus productos!',
                confirmButtonText: 'Aceptar'
            })
            
            fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
            }).then((response) => {
                if (response.ok) {
                    console.log('Éxito');
                    
                } else {
                    console.log("Algo salió mal");
                }
            });
        });
    });
});