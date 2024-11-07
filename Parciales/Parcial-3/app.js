import * as ui from './ui.js';

const elements = {
  pokemonNameInput: document.getElementById('pokemonName'),
  searchTypeSelect: document.getElementById('searchType'),
  searchButton: document.getElementById('searchButton'),
  clearButton: document.getElementById('clearButton'),
  pokemonInfoContainer: document.getElementById('pokemonInfo'),
};

const api = {
  getPokemonData: async (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Pokémon no encontrado');
      const pokemonData = await response.json();

      const speciesUrl = pokemonData.species.url;
      const speciesResponse = await fetch(speciesUrl);
      const speciesData = await speciesResponse.json();

      const evolutionChainUrl = speciesData.evolution_chain.url;
      const evolutionChainResponse = await fetch(evolutionChainUrl);
      const evolutionChainData = await evolutionChainResponse.json();

      return { pokemonData, evolutionChainData };
    } catch (error) {
      console.error('Error al obtener los datos del Pokémon:', error);
      return null;
    }
  },
  getAbilityData: async (ability) => {
    const url = `https://pokeapi.co/api/v2/ability/${ability}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Habilidad no encontrada');
      const abilityData = await response.json();
      return abilityData;
    } catch (error) {
      console.error('Error al obtener los datos de la habilidad:', error);
      return null;
    }
  }
};

const handlers = {
  handleSearch: async () => {
    const searchTerm = elements.pokemonNameInput.value.trim().toLowerCase();
    const searchType = elements.searchTypeSelect.value;

    if (searchTerm) {
      let data;
      if (searchType === 'pokemon') {
        data = await api.getPokemonData(searchTerm);
        if (data) {
          const { pokemonData, evolutionChainData } = data;
          ui.displayPokemonData(pokemonData, evolutionChainData);
        } else {
          ui.displayError('Pokémon no encontrado');
        }
      } else if (searchType === 'ability') {
        data = await api.getAbilityData(searchTerm);
        if (data) {
          ui.displayAbilityData(data);
        } else {
          ui.displayError('Habilidad no encontrada');
        }
      }
      elements.clearButton.classList.remove('hidden');
      elements.pokemonNameInput.value = '';
    } else {
      ui.displayError('Ingrese un término de búsqueda');
    }
  },
  handleClear: () => {
    elements.pokemonNameInput.value = '';
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
