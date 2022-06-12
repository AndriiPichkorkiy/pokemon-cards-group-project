import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export class APIService {
  constructor() {
    this.query = '';
    this.url = '';
  }

  getPokemonsList() {
    return fetch(BASE_URL).then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });
  }

  getPokemon(pokemon) {
    return fetch(`${BASE_URL}/${pokemon}`).then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });
  }
}
