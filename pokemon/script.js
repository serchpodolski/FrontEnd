// Setup some DOM variables
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const spriteContainer = document.getElementById("sprite-container");
const types = document.getElementById("types");

//variables for the table elements
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const pikachURL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"

const validateInput = () => {
  const pokemonValue = searchInput.value;
  if(!pokemonValue){
    alert("Please enter a valid name or id");
  }else if(isNaN(pokemonValue)){
    fetchPikachuData(pokemonValue.toLowerCase());
  }else{
    fetchPikachuData(pokemonValue);
  }
}

const fetchPikachuData = (pokeid) => {
  console.log(pokeid);
  fetch(`${pikachURL}${pokeid}`).then((res)=> res.json())
  .then((data) => {
    console.log(data);
    populatePokemonInfo(data);
  }).catch((err)=>{
    alert("Pokémon not found");
    console.log(err);
  });
}

const populatePokemonInfo = (data) => {
  // const statsTable = {};
  const {weight, height, name, id, sprites, stats, types} = data;
  const {front_default} = sprites;
  stats.forEach(({base_stat, stat})=>{
    displayTableInfo(stat.name, base_stat);
  })
  displayBaseInfo(weight, height, name, id, front_default);
  types.forEach(({type})=>{
    displayTypes(type.name);
  })
}

const displayBaseInfo = (weight_, height_, name, id, front_default) =>{
  pokemonName.innerHTML = name;
  pokemonId.innerHTML = `#${id}`;
  weight.innerHTML = `Weight: ${weight_}`;
  height.innerHTML = `Height: ${height_}`;
  spriteContainer.innerHTML = `<img src=${front_default} alt="${name} sprite" width="150" height="150" id="sprite">`;
}

const displayTableInfo = (stat, base_stat) => {
  window[stat].textContent = base_stat;
};

const displayTypes = (name) => {
  types.innerHTML += `<span class="typeBlock">${name.toUpperCase()}</span>`;
}

searchButton.addEventListener("click", ()=>{
        types.innerHTML = "";
        validateInput()}
      );
