let contador = 1; // Para enumerar a los participantes
let participantes = []; // Lista de participantes con su nombre, color y votos
let coloresUsados = new Set(); // Para almacenar los colores usados
let totalVotos = 0; // Para llevar la cuenta total de los votos

// Función para generar un color aleatorio en formato hexadecimal que no se repita
function generarColorAleatorio() {
    let color;
    do {
        color = '#';
        const letras = '0123456789ABCDEF';
        for (let i = 0; i < 6; i++) {
            color += letras[Math.floor(Math.random() * 16)];
        }
    } while (coloresUsados.has(color)); // Repetir hasta que el color no esté en el set
    coloresUsados.add(color); // Añadir el nuevo color al set
    return color;
}

// Configurar el gráfico de barras con Chart.js
const ctx = document.getElementById('bar-chart').getContext('2d');
let barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [], // Los nombres de los participantes
        datasets: [{
            label: 'Porcentaje de votos',
            data: [], // Los porcentajes de votos
            backgroundColor: [], // Los colores asociados
            borderColor: [],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100 // El máximo será 100%
            }
        }
    }
});

// Función para actualizar el gráfico de barras
function actualizarGrafico() {
    const porcentajes = participantes.map(p => (p.votos / totalVotos) * 100 || 0); // Calcular los porcentajes
    barChart.data.labels = participantes.map(p => p.nombre); // Actualizar nombres
    barChart.data.datasets[0].data = porcentajes; // Actualizar datos de votos
    barChart.data.datasets[0].backgroundColor = participantes.map(p => p.color); // Colores de los participantes
    barChart.update(); // Refrescar el gráfico
}

// Agregar funcionalidad al botón "Agregar"
document.querySelector("#btn_agregar").addEventListener("click", () => {
    const nombre = document.querySelector("#nombre").value;
    const colorHex = document.querySelector('#hex-color').value.trim(); // Hex color ingresado
    const colorSelect = document.querySelector("#color").value; // Color seleccionado del select

    // Validar si el nombre está vacío
    if (!nombre) {
        alert("Por favor ingresa un nombre.");
        return;
    }

    // Definir el color final: Si no hay hex ni select, generar un color aleatorio
    let colorFinal = colorHex ? colorHex : (colorSelect !== '' ? colorSelect : generarColorAleatorio());

    // Crear el contenedor para el participante
    const participante = document.createElement("div");
    participante.className = "participante";
    participante.innerHTML = `<span>${contador}. </span> <span style="color:${colorFinal}">${nombre}</span>`;

    // Crear el botón "Votar"
    const btn_votar = document.createElement("button");
    btn_votar.textContent = "Votar";
    btn_votar.style.marginLeft = "10px"; // Espacio entre el nombre y los botones

    // Crear el contador de votos
    const contadorVotos = document.createElement("span");
    contadorVotos.textContent = "0"; // Inicialmente 0 votos
    contadorVotos.style.marginLeft = "10px"; // Espacio entre el botón votar y el contador
    contadorVotos.style.padding = "5px";
    contadorVotos.style.border = "1px solid black"; // Estilo del contador
    contadorVotos.style.backgroundColor = "white";

    // Incrementar el contador de votos al hacer clic en "Votar"
    btn_votar.addEventListener("click", () => {
        let votosActuales = parseInt(contadorVotos.textContent);
        contadorVotos.textContent = votosActuales + 1;
        totalVotos++;
        participantes.find(p => p.nombre === nombre).votos++;
        actualizarGrafico(); // Actualizar el gráfico de barras
    });

    // Crear el botón "Eliminar"
    const btn_eliminar = document.createElement("button");
    btn_eliminar.textContent = "Eliminar";
    btn_eliminar.style.marginLeft = "5px"; // Espacio entre el botón votar y eliminar
    btn_eliminar.addEventListener("click", () => {
        participante.remove(); // Eliminar el participante
        coloresUsados.delete(colorFinal); // Liberar el color usado
        participantes = participantes.filter(p => p.nombre !== nombre); // Remover del array de participantes
        actualizarGrafico(); // Actualizar el gráfico de barras
    });

    // Añadir botones y contador al contenedor del participante
    participante.appendChild(btn_votar);
    participante.appendChild(contadorVotos);
    participante.appendChild(btn_eliminar);

    // Agregar el participante a la lista
    document.querySelector("#lista-nombres").appendChild(participante);

    // Añadir el nuevo participante al array
    participantes.push({ nombre, color: colorFinal, votos: 0 });

    // Limpiar el input del nombre después de agregar
    document.querySelector("#nombre").value = '';

    // Limpiar el selector de color y el campo de texto de color hexadecimal
    document.querySelector("#color").selectedIndex = 0; // Desmarcar opción seleccionada
    document.querySelector("#hex-color").value = ''; // Limpiar el input de hexadecimal

    contador++; // Incrementar el contador para el próximo participante
});
