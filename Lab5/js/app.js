const App = (() => {
    const htmlElements = {
      form: document.querySelector('form'),
      response: document.querySelector('#response'),
      colorSelect: document.querySelector('#color-select')
    };
    
    const handlers = {
      onInputChange(e) {
        htmlElements.response.textContent = reverseString(e.target.value);
      },
      onColorChange(e) {
        htmlElements.response.style.color = e.target.value; 
      }
    };
  
    const bindEvents = () => {
      htmlElements.form.elements.cadena.addEventListener('input', handlers.onInputChange);
      htmlElements.colorSelect.addEventListener('change', handlers.onColorChange); 
    };
  
    return {
      init() {
        bindEvents();
      }
    };
  })();

  const reverseString = (str) => {
    return str.split('').reverse().join('');
  };
  
  App.init();
  