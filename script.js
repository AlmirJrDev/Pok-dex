const pokemonName = document.querySelector('.pokemonname'); 
const pokemonNumber = document.querySelector('.pokemonnumber'); 
const pokemonImage = document.querySelector('.pokemonimage'); 

const form = document.querySelector('.form'); 
const input = document.querySelector('.inputsearch'); 

const buttonPrev = document.querySelector('.btn-prev'); 
const buttonNext = document.querySelector('.btn-next'); 

let searchPokemon = 0;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
    const data = await APIResponse.json()

    return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = '';


    const data = await fetchPokemon(pokemon);

   if (data) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;  
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    input.value = '';

    searchPokemon = data.id;
   } else {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Not Found :c';
    pokemonNumber.innerHTML = '';
    
   }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});


buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});


buttonPrev.addEventListener('click', () => {
  if( searchPokemon > 1) {
  searchPokemon -= 1;
  renderPokemon(searchPokemon);
  }
    
  });
  



