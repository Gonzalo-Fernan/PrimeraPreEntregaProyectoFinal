

const loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    const formData = new FormData(loginForm)

    fetch('http://localhost:8080/api/users/login', {
        
        method: 'POST',
        body: formData,
    })
    .then((response) =>{
        
            if (response.ok) {
                window.location.replace("http://localhost:8080/products")
                console.log("Inicio de sesion exitoso")
            } else {
                console.log("Error. Datos de login incorrectos")
            }
        })
        .catch(error => {
            console.error(error ,'Error al iniciar sesion:');
        });
})