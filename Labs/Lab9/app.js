import * as ui from './ui.js';

const elements = {
  pokemonNameInput: document.getElementById('pokemonName'),
  searchButton: document.getElementById('searchButton'),
  clearButton: document.getElementById('clearButton'),
  pokemonInfoContainer: document.getElementById('pokemonInfo'),
};

const api = {
  getPokemonData: async (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Pokémon no encontrado');
      return await response.json();
    } catch (error) {
      console.error('Error al obtener los datos del Pokémon:', error);
      return null;
    }
  }
};

const handlers = {
  handleSearch: async () => {
    const pokemonName = elements.pokemonNameInput.value.trim().toLowerCase();
    if (pokemonName) {
      const pokemonData = await api.getPokemonData(pokemonName);
      if (pokemonData) {
        ui.displayPokemonData(pokemonData);
        elements.clearButton.classList.remove('hidden');
      } else {
        ui.displayError('Pokémon no encontrado');
      }
      // Eliminar esta línea para que el input no se borre automáticamente después de la búsqueda
      // elements.pokemonNameInput.value = '';
    } else {
      ui.displayError('Ingrese un nombre de Pokémon');
    }
  },
  handleClear: () => {
    elements.pokemonNameInput.value = ''; // Borra el valor solo cuando se presiona el botón de limpiar
    elements.pokemonInfoContainer.classList.add('hidden');
    elements.pokemonInfoContainer.innerHTML = '';
    elements.clearButton.classList.add('hidden');
  },
  handleKeyPress: (event) => {
    if (event.key === 'Enter') {
      handlers.handleSearch();
    }
  }
};

const bindEvents = () => {
  elements.searchButton.addEventListener('click', handlers.handleSearch);
  elements.clearButton.addEventListener('click', handlers.handleClear);
  elements.pokemonNameInput.addEventListener('keypress', handlers.handleKeyPress);
};

const init = () => {
  bindEvents();
};

init();
