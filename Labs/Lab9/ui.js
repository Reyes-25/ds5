const pokemonInfoContainer = document.getElementById('pokemonInfo');

export const displayPokemonData = (pokemon) => {
  pokemonInfoContainer.classList.remove('hidden');
  pokemonInfoContainer.innerHTML = `
    <div class="pokemon-card">
      <div class="pokemon-name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} (${pokemon.id})</div>
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
    </div>
  `;
};

export const displayError = (message) => {
  pokemonInfoContainer.classList.remove('hidden');
  pokemonInfoContainer.innerHTML = `<p class="error">${message}</p>`;
};
