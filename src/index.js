import './scss/main.scss';
import './css/main.css';

import { APIService } from './js/services/APIService';

const pokemonsListRef = document.querySelector('.pokemon__container');

const newPokemonApi = new APIService();

newPokemonApi
  .getPokemonsList()
  .then(pokemons =>
    pokemons.results.forEach(pokemon =>
      newPokemonApi.getPokemon(pokemon.name).then(makePokemonMarkup),
    ),
  );

function makePokemonMarkup(markup) {
  const pokemonMarkup = `<li class="pokemon-card">
  <h2 class="pokemon-card__name">${markup.name}</h2>
  <img
    src=${markup.sprites.other.dream_world.front_default}
  />
  </li>
  `;
  pokemonsListRef.insertAdjacentHTML('beforeend', pokemonMarkup);
}
