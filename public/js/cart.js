document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll(".eliminar");
    const buybutton = document.getElementById("buy")

    deleteButtons.forEach((button) => {
        const productId = button.getAttribute("data-prod");
        const cartId = button.getAttribute("data-cart");
        button.addEventListener("click", () => {
         
            fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
            }).then((response) => {
                window.location.reload()
                if (response.ok) {
                    console.log('Éxito');
                } else {
                    console.log("Algo salió mal");
                }
            });
        });
    });
    buybutton.addEventListener("click",()=>{
        const cartId = buybutton.getAttribute("data-cart");
        Swal.fire({
            title: 'Compra realizada con éxito',
            text: 'Hemos generado un tickect de su compra. Gracias por confiar en nuestros productos!',
            confirmButtonText: 'Aceptar'
        })
        .then(function(){
            location.reload();
            })
        fetch(`/api/carts/${cartId}/purchase`, {
            method: "GET",
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
    })
});

