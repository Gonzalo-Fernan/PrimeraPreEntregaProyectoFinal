

const server = io()

let user;

window.onload = ()=>{
    Swal.fire({
        title: 'Bienvenido',
        text: 'Ingresá tu nombre de usuario!',
        input: "text",
        inputValidator: (value)=>{  
            return !value && "Ingresa un nombre de usuario para continuar"
        },
        confirmButtonText: 'Ingresar'
      }).then((result) => {
        user = result.value
        server.emit("auth", user)
      })
    
}

let input = document.getElementById("message")
const sendButton = document.getElementById("send")
sendButton.addEventListener("click", ()=>{
    let newMessage = {user: user, message: input.value}
    server.emit("newMessage", newMessage)
    console.log(input.value);
    input.value= ""

})

server.on('newMessage', (newMessage) => {
    const messageConteiner = document.getElementById("messageConteiner")
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chatMessage');
    chatMessage.innerHTML = `
            <h3>usuario: ${newMessage.user}</h3>
            <p>mensaje: ${newMessage.message}</p>`
        
messageConteiner.appendChild(chatMessage);
    
})
