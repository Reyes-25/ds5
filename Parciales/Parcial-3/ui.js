const pokemonInfoContainer = document.getElementById('pokemonInfo');

// Función para capitalizar la primera letra de una cadena
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const displayPokemonData = (pokemon, evolutionChain) => {
  pokemonInfoContainer.classList.remove('hidden');

  // Capitalizar las habilidades
  const abilities = pokemon.abilities
    .map(ability => capitalize(ability.ability.name))
    .join(', ');

  // Obtener la cadena evolutiva y capitalizar cada nombre
  const evolutionChainArray = [];
  let current = evolutionChain.chain;

  while (current) {
    evolutionChainArray.push(capitalize(current.species.name));
    current = current.evolves_to[0];
  }

  pokemonInfoContainer.innerHTML = `
    <div class="pokemon-card">
      <div class="pokemon-name">${capitalize(pokemon.name)} (${pokemon.id})</div>
      <div class="pokemon-details">
        <div><strong>Sprites</strong></div>
        <div>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <img src="${pokemon.sprites.back_default}" alt="${pokemon.name}">
        </div>
      </div>
      <div class="pokemon-details">
        <p><strong>Weight / Height</strong></p>
        <p>${pokemon.weight / 10} / ${pokemon.height / 10}</p>
      </div>
      <div class="pokemon-details">
        <p><strong>Abilities:</strong></p>
        <p>${abilities}</p>
      </div>
      <div class="pokemon-details">
        <p><strong>Evolution chain:</strong></p>
        <p>${evolutionChainArray.join(' ➔ ')}</p>
      </div>
    </div>
  `;
};

export const displayAbilityData = (abilityData) => {
  pokemonInfoContainer.classList.remove('hidden');

  // Obtener el nombre de la habilidad y los Pokémon que la comparten, capitalizando la primera letra
  const abilityName = capitalize(abilityData.name);
  const pokemonsWithAbility = abilityData.pokemon.map(pokemonEntry => capitalize(pokemonEntry.pokemon.name));

  // Generar la lista de Pokémon en formato de lista no enumerada, capitalizados
  const pokemonListItems = pokemonsWithAbility.map(pokemon => `<li>${pokemon}</li>`).join('');

  pokemonInfoContainer.innerHTML = `
    <div class="pokemon-card">
      <div class="pokemon-name">${abilityName}</div>
      <div class="pokemon-details">
        <p><strong>Who can learn it:</strong></p>
        <ul>${pokemonListItems}</ul>
      </div>
    </div>
  `;
};

export const displayError = (message) => {
  pokemonInfoContainer.classList.remove('hidden');
  pokemonInfoContainer.innerHTML = `<p class="error">${message}</p>`;
};
