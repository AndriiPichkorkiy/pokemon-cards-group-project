import './scss/main.scss';
import './css/main.css';

import { APIService } from './js/services/APIService';

const pokemonsListRef = document.querySelector('.pokemon__container');
const modal = document.querySelector('#modal-backdrop');

const modalRoot = document.querySelector('#modal-root');

pokemonsListRef.addEventListener('click', onOpenModal);

function onCloseModal() {
  modalRoot.innerHTML = '';
}

function onOpenModal(event) {
  if (!event.target.nodeName === 'LI') return;

  const pokemon = event.target.dataset.name;

  newPokemonApi.getPokemon(pokemon).then(createModalMarkup);
}

const newPokemonApi = new APIService();

newPokemonApi
  .getPokemonsList()
  .then(pokemons =>
    pokemons.results.forEach(pokemon =>
      newPokemonApi.getPokemon(pokemon.name).then(makePokemonMarkup),
    ),
  );

function makePokemonMarkup(markup) {
  const pokemonMarkup = `<li class="pokemon-card" data-name="${markup.name}">
  <h2 class="pokemon-card__name" data-name="${markup.name}">${markup.name}</h2>
  <img data-name="${markup.name}" 
    src=${markup.sprites.other.dream_world.front_default}
  />
  </li>
  `;
  pokemonsListRef.insertAdjacentHTML('beforeend', pokemonMarkup);
}

function createModalMarkup(pokemon) {
  console.log(pokemon);

  modalRoot.innerHTML = `  <div class="backdrop" id="modal-backdrop">
        <div class="modal">
          <button class="modal__button-close">Х</button>
          <div class="container-card">
            <img
              class="pokemon-image"
              src="${pokemon.sprites.other.dream_world.front_default}"
              alt="pokemon-image"
              width="300"
              height="300"
            />
            <div class="description-card">
              <h3 class="description-title">${pokemon.name}</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum
                optio asperiores, sunt ipsam est ex. Vel a labore rem harum
                facere eaque enim officia molestias! Possimus, tenetur earum.
                Modi deserunt dolorum ex ullam, ipsa blanditiis qui voluptate
                vitae amet saepe. Fugit quos cum, libero laborum deleniti earum
                adipisci? Eligendi, qui?
              </p>
            </div>
          </div>

          <table class="modal-table">
            <thead>
              <tr>
                <th>hp</th>
                <th>attack</th>
                <th>defense</th>
                <th>special-attack</th>
                <th>special-defense</th>
                <th>speed</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Value</td>
                <td>Value</td>
                <td>Value</td>
                <td>Value</td>
                <td>Value</td>
                <td>Value</td>
              </tr>
            </tbody>
          </table>

          <button class="modal-btn" type="button">Add to your favorite!</button>
        </div>
      </div>
  `;

  const closeModalBtn = document.querySelector('.modal__button-close');
  closeModalBtn.addEventListener('click', onCloseModal);
}

console.log('Это моя ветка. Проверь пожалуйста');
