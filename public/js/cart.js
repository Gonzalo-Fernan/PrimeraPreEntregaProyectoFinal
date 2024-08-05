document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll(".eliminar");

    deleteButtons.forEach((button) => {
        const productId = button.getAttribute("data-prod");
        const cartId = button.getAttribute("data-cart");
        button.addEventListener("click", () => {
            console.log(cartId);
            console.log(productId);
            

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
});