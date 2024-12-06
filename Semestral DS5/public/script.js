const mssgContainer = document.getElementById('messages');

let timer;
let currentIndex = 0; 
let rounds = 3;
let startTime;
let triviaData = [];
let counter = 7 * 1000;

const contentDiv = document.getElementById("content");
const mainInput = document.getElementById("inputbox");

function mainMenu() {
  const initialContent = `
    <h1 class="trivia-title">TRIVIA CODE</h1>
    <ul class="menu">
      <li id="iniciarBtn">iniciar</li>
      <li id="opcionesBtn">opciones</li>
      <li id="destruirBtn">destruir</li>
    </ul>
  `;
  contentDiv.innerHTML = initialContent;
  mainInput.value = '';
  mainInput.disabled = true;
  attachMenuEvents();
}

function attachMenuEvents() {
  // Botón de iniciar
  document.getElementById("iniciarBtn").addEventListener("click", function () {
    contentDiv.innerHTML = "";
    mainInput.disabled = false;
    const gameBox = `
      <p class="adivina-el">Adivina el Acronimo...</p>
      <p id="show-acronym" class="displaying-question"></p>
    `;
    contentDiv.innerHTML = gameBox;
    obtenerTrivia();
    document.getElementById("inputbox").focus();
  });

  // Botón de opciones
  document.getElementById("opcionesBtn").addEventListener("click", function () {
    const optionContent = `
      <div class="rondasbox">
        <p>RONDAS</p>
        <input type="text" id="numberRounds" value="${rounds}" maxlength="2"></input>
      </div>
    `;
    contentDiv.innerHTML = optionContent;

    const customRounds = document.getElementById('numberRounds');

    customRounds.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        
        const value = parseInt(customRounds.value, 10);
        if (isNaN(value) || !Number.isInteger(value)) {

            const errorMessage = document.createElement('div');
            errorMessage.classList.add('customedRounds');
          
            errorMessage.innerHTML = `
                <div class="fatal-error">
                <span style="color: red;">FATAL ERROR</span>
                <span style="color: purple;">${customRounds.value}</span>
                <span>is not a number</span>
                </div>
            `;
            mssgContainer.appendChild(errorMessage);

          }
         else {
            if (value > 15 || value < 2){
              const errorMessage = document.createElement('div');
              errorMessage.classList.add('customedRounds');
            
              errorMessage.innerHTML = `
                <div class="fatal-error">
                <span style="color: red;">[error]</span>
                <span style="color: yellow;">overflow -</span>
                <span ">el número introducido esta fuera del limite, intenta un rango de</span>
                <span style="color: yellow";>2-15</span>
                </div>
              `;
              mssgContainer.appendChild(errorMessage);
            }
            else{
              rounds = value;
              const roundsSetted = document.createElement('div');
              roundsSetted.classList.add('customedRounds');
            
              roundsSetted.innerHTML = `
                <div>
                  <span style="color: green";>SUCCEED</span>
                  <span style="color: yellow";>${value}</span>
                  <span>rondas han sido configuradas con éxito</span>
                </div>
              `;
              mssgContainer.appendChild(roundsSetted);
              mainMenu(); 
            }
        }
      }
    });
  });

  document.getElementById("destruirBtn").addEventListener("click", function () {
    window.location.href = "index.html";
  });
}

window.onload = function () {
  const welcome = document.createElement('div');
  welcome.classList.add('welcome');

  welcome.innerHTML = `
    <div">
      <span style="color: green";>SUCCEED</span>
      <span style="color: purple";>${localStorage.getItem('username') || 'USUARIO00'}</span>
      <span>ha sido registrado exitosamente</span>
    </div>
  `;    
  
  setTimeout( () => {
    mssgContainer.appendChild(welcome);
  }, 1200)
  mainMenu();
};

const inputElement  = document.getElementById('inputbox');

async function obtenerTrivia() {
  try {
      const response = await fetch('/api/trivia');
      const trivia = await response.json();

      triviaData = Object.keys(trivia).map(key => ({
          pregunta: key,
          significado: trivia[key]
      }));

      if (triviaData.length > 0) {
          mostrarAcronimo(currentIndex);
          console.log(trivia)
      } else {
          console.error('No hay datos de trivia disponibles.');
      }

  } catch (error) {
      console.error('Error al obtener la trivia:', error);
  }
}


async function mostrarAcronimo(index){
    clearTimeout(timer);
    const acronymElement = document.getElementById('show-acronym');
    acronymElement.textContent = triviaData[index].pregunta.toUpperCase();
    acronymElement.setAttribute('style', 'font-size: 70px !important;');
    startTime = new Date(); 
    timer = setTimeout(() => {
      // Si el tiempo se acaba, pasar a la siguiente pregunta
      manejarTiempoExcedido();
  }, counter); 

}


inputElement.addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
        const valorInput = inputElement.value;
        console.log(valorInput);
        verificarRespuesta();
        inputElement.value = '';
    }
});

/* todavia
function checkInput(){
  const input = document.getElementById("inputbox")
  input.value = "correcto";
  input.readOnly = true;
}
*/

function verificarRespuesta() {
  const answerUser = inputElement.value.trim().toLowerCase();
  const correctAnswer = triviaData[currentIndex].significado;

  if (correctAnswer.includes(answerUser)) {
      clearTimeout(timer); 
      const acronymElement = document.getElementById('show-acronym');
      //const originalText = acronymElement.textContent;
      acronymElement.textContent = '¡Correcto!';
      acronymElement.setAttribute('style', 'color: green; font-size: 25px !important;');
      //acronymElement.style.visibility = 'hidden';
      //checkInput()
      const endTime = new Date(); // Captura el tiempo de envío
      const elapsedTime = (endTime - startTime) / 1000; // Diferencia en segundos
      const WPM = ((answerUser.length/5)/elapsedTime)*60

      //console.log("¡Felicidades! Lo has adivinado.");
      //console.log(`Tiempo demorado: ${elapsedTime} segundos`);

      const message = document.createElement('div');
      message.classList.add('message');
    
      
      message.innerHTML = `
          <div>
            <span style="color: green;">${localStorage.getItem('username') || 'USUARIO00'}</span>
            <span>responde a </span>
            <span style="color: red;">${WPM.toFixed(2)}</span>
            <span>WPM en </span>
            <span style="color: red;">${elapsedTime.toFixed(2)}s.</span>         
         </div>
      `;    

      mssgContainer.appendChild(message);


      currentIndex++;

      if (currentIndex < rounds) {
          setTimeout(() => {
              acronymElement.textContent = triviaData[currentIndex].acronym;
              acronymElement.style.color = '';
              mostrarAcronimo(currentIndex);
          }, 3000);
      } else {
        setTimeout(() => {
          mostrarResultados();
      }, 3000);      }
  }
}



function manejarTiempoExcedido() {
  clearTimeout(timer); 
  const acronymElement = document.getElementById('show-acronym');
  acronymElement.textContent = '¡Tiempo agotado!';
  acronymElement.setAttribute('style', 'color: red; font-size: 25px !important;');
  const message = document.createElement('div');
  message.classList.add('message');

  message.innerHTML = `
      <div>
        <span style="color: red;">TIMEOUT</span>
        <span>respuesta</span>
        <span style = "color: gray";>${triviaData[currentIndex].significado[0].toUpperCase()}</span>
     </div>
  `;    

  mssgContainer.appendChild(message);


  currentIndex++;

  if (currentIndex < rounds) {
      setTimeout(() => {
          acronymElement.textContent = triviaData[currentIndex].acronym;
          acronymElement.style.color = '';
          mostrarAcronimo(currentIndex);
      }, 3000);
  } else {
    setTimeout(() => {
      mostrarResultados();
  }, counter);      }
}

function mostrarResultados() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  const user = localStorage.getItem('username') || 'USUARIO00';
  const imageSrc = localStorage.getItem('profileImage') || 'images/pfp_default.png';

  const resultsDiv = document.createElement('div');
  resultsDiv.classList.add('results-container');

  resultsDiv.innerHTML = `
      <img src="${imageSrc}" class="winner-img">
      <img src="/images/winnerpng.png" class="winnnner">
      <p class="user-name">${user}</p>
  `;

  contentDiv.appendChild(resultsDiv);
  currentIndex = 0;

  setTimeout(() => {
      mainMenu();
  }, 5000);
}

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
