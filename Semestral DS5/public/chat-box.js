const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');

// Detectar la tecla Enter en el input
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que el Enter inserte una nueva línea en el input
        sendMessage();
    }
}); 

function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText) {
        const savedUsername = localStorage.getItem('username') || 'USUARIO00';
        const savedImage = localStorage.getItem('profileImage') || 'images/pfp_default.png';
        const currentTime = getCurrentTime(); // Obtener la hora actual
        addMessage(savedUsername, messageText, savedImage, currentTime);
        messageInput.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll al final
    }
}

function addMessage(user, text, imageSrc, time) {
    const message = document.createElement('div');
    message.classList.add('message');

    message.innerHTML = `
        <img src="${imageSrc}" alt="Profile picture">
        <div class="message-text">
            <strong>${user}:</strong> ${text} <span class="time" style="color:gray";>${time}</span>

        </div>
    `;
    messagesContainer.appendChild(message);
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
