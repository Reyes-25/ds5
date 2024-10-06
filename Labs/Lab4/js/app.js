const App = (() => {
    const htmlElements = {
      form: document.querySelector('form'),
      response: document.querySelector('#response'),
      colorSelect: document.querySelector('#color-select')  // Select para cambiar color de texto
    };
    
    const handlers = {
      onInputChange(e) {
        htmlElements.response.textContent = reverseString(e.target.value); // Mostrar texto invertido
      },
      onColorChange(e) {
        htmlElements.response.style.color = e.target.value; // Cambiar color del texto invertido
      }
    };
  
    const bindEvents = () => {
      // Evento para invertir texto cuando el usuario escribe en el input
      htmlElements.form.elements.cadena.addEventListener('input', handlers.onInputChange);
      // Evento para cambiar el color del texto
      htmlElements.colorSelect.addEventListener('change', handlers.onColorChange); 
    };
  
    return {
      init() {
        bindEvents();
      }
    };
  })();
  
  // Función para invertir una cadena
  const reverseString = (str) => {
    return str.split('').reverse().join('');
  };
  
  // Inicializamos la aplicación
  App.init();
  