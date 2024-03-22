

socket.on('newMessage', (newMessage) => {
    const messageConteiner = document.getElementById("messageConteiner")
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chatMessage');
    chatMessage.innerHTML = `
        <div class="messageView">
            <h2>usuario: ${addMessage.user}</h2>
            <p>mensaje: ${addMessage.message}</p>
        </div>`;
    messageConteiner.appendChild(chatElement);
})

