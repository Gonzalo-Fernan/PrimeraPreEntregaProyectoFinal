
document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.eliminar');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const email = button.getAttribute("data-email");

            fetch(`/api/users/delete/${email}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((response) => {
                if (response.status === 200) {
                  console.log('exito');
                  button.parentElement.remove(); // Esto elimina el contenedor del usuario
                } else {
                  console.log("algo salio mal");
                }
              })
        })
    })

    
    const roleSelectors = document.querySelectorAll('.role-selector');
    
    // Agregar evento change a cada <select> para actualizar el atributo data-rol del botón correspondiente
    roleSelectors.forEach(selector => {
        selector.addEventListener('change', (event) => {
            const selectedRole = event.target.value;
            const userId = selector.getAttribute('data-id');
            const changeRoleButton = document.querySelector(`.cambiarRol[data-id='${userId}']`);
            
            // Actualizar el atributo data-rol del botón correspondiente
            changeRoleButton.setAttribute('data-rol', selectedRole);
        });
    });

    // Agregar evento click a cada botón de cambiar rol
    const changeRoleButtons = document.querySelectorAll('.cambiarRol');
    
    changeRoleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userEmail = button.getAttribute('data-email');
            const newRole = button.getAttribute('data-rol');
            console.log(newRole);
            fetch(`/api/users/changeRole/${userEmail}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail, role: newRole }),
              }).then((response) => {
                if (response.status === 200) {
                  console.log('Rol actualizado con éxito');
                  window.location.reload();
                } else {
                  console.log("Algo salió mal al intentar actualizar el rol");
                }
              }).catch((error) => {
                console.error("Error en la solicitud:", error);
              });
        });
    });
})
