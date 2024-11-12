const pokemonInfoContainer = document.getElementById('pokemonInfo');

// Función para capitalizar la primera letra de una cadena
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Función para dividir una lista en sublistas de un tamaño determinado
const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

// Función para mostrar los datos del Pokémon
export const displayPokemonData = (pokemon, evolutionChain) => {
  pokemonInfoContainer.classList.remove('hidden');

  // Capitalizar las habilidades
  const abilities = pokemon.abilities.map(ability => capitalize(ability.ability.name));

  // Dividir habilidades en columnas de hasta 10 elementos
  const chunkedAbilities = chunkArray(abilities, 10);
  const abilitiesHTML = chunkedAbilities.map(chunk => {
    const listItems = chunk.map(ability => `<li>${ability}</li>`).join('');
    return `<ul>${listItems}</ul>`;
  }).join('');

  // Obtener la cadena evolutiva y capitalizar cada nombre
  const evolutionChainArray = [];
  let current = evolutionChain.chain;

  while (current) {
    evolutionChainArray.push(capitalize(current.species.name));
    current = current.evolves_to[0];
  }

  // Dividir evoluciones en columnas de hasta 10 elementos
  const chunkedEvolutions = chunkArray(evolutionChainArray, 10);
  const evolutionHTML = chunkedEvolutions.map(chunk => {
    const listItems = chunk.map(evolution => `<li>${evolution}</li>`).join('');
    return `<ul>${listItems}</ul>`;
  }).join('');

  pokemonInfoContainer.innerHTML = `
    <div class="pokemon-card">
      <div>
        <div class="pokemon-name">${capitalize(pokemon.name)} (${pokemon.id})</div>

        <div class="pokemon-details">

          <div><strong>Sprites</strong></div>
          <div>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <img src="${pokemon.sprites.back_default}" alt="${pokemon.name}">
          </div>
        </div>

        <div class="pokemon-evolution">
          <div><strong>Evolution chain:</strong></div>
          <div class="pokemon-evolution-columns">${evolutionHTML}</div>
        </div>

      </div>

      <div class="pokemon-card-2">

        <div class="pokemon-stats">
          <div><strong>Weight / Height</strong></div>
          <div>${pokemon.weight / 10} / ${pokemon.height / 10}</div>
        </div>

        <div class="pokemon-ability">
          <div><strong>Abilities:</strong></div>
          <div class="pokemon-abilities-columns">${abilitiesHTML}</div>
        </div>

      </div>
    </div>
  `;
};

// Función para mostrar los datos de una habilidad
export const displayAbilityData = (abilityData) => {
  pokemonInfoContainer.classList.remove('hidden');

  // Obtener el nombre de la habilidad y los Pokémon que la comparten
  const abilityName = capitalize(abilityData.name);
  const pokemonsWithAbility = abilityData.pokemon.map(pokemonEntry => capitalize(pokemonEntry.pokemon.name));

  // Dividir la lista en sublistas de hasta 10 elementos
  const chunkedPokemonList = chunkArray(pokemonsWithAbility, 10);
  const columnsHTML = chunkedPokemonList.map(chunk => {
    const listItems = chunk.map(pokemon => `<li>${pokemon}</li>`).join('');
    return `<ul>${listItems}</ul>`;
  }).join('');

  pokemonInfoContainer.innerHTML = `
    <div class="pokemon-card-3">
      <div class="pokemon-name">${abilityName}</div>
      
      <div class="pokemon-details">
        <div><strong>Who can learn it:</strong></div>
        <div class="pokemon-abilities-columns">${columnsHTML}</div>
      </div>
    </div>
  `;
};

export const displayError = (message) => {
  pokemonInfoContainer.classList.remove('hidden');
  pokemonInfoContainer.innerHTML = `<p class="error">${message}</p>`;
}; 