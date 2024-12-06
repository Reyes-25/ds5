
const sendMessage = document.getElementById('username');

sendMessage.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
      event.preventDefault(); 
      saveName();
  }
}); 


function openDialog() {
    document.getElementById('dialog').style.display = 'flex';
  }
  
  function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
  }
  
  
  function saveName() {
    const username = document.getElementById('username').value.trim();
    const usernameRegex = /^[a-zA-Z0-9\-_]{2,12}$/;
    if (usernameRegex.test(username)) {
        localStorage.setItem('username', username);
        displayUsername(username);
        closeDialog();
    } else {
      showTemporaryError("el usuario solo puede tener letras, números y guiones");
    }
  }
  
  
  function displayUsername(name) {
    const displayElement = document.getElementById('display-username');
    displayElement.textContent = `${name}`;
  }
  
  window.onload = function () {
    const savedName = localStorage.getItem('username');
    if (savedName) {
        displayUsername(savedName);
    }
  };
  
  function showTemporaryError(message) {
    const errorElement = document.createElement('div');
    errorElement.textContent = message;
    errorElement.classList.add('error-message');
    
    document.body.appendChild(errorElement);

    setTimeout(() => {
        errorElement.remove();
    }, 3000); 
}