var current_index;

document.getElementById("searchSubmit").addEventListener("click", GetPokemon);
document.getElementById("prev").addEventListener("click", GetPrevious);
document.getElementById("next").addEventListener("click", GetNext);

function GetPokemon(given) {
  event.preventDefault();
  console.log("This is what I am given:"+given);
  let value = document.getElementById("searchInput").value;
  if(Number.isInteger(given)) {
    value = parseInt(given);
    console.log("There was a value");
  }

  console.log(value);
  const url = "https://pokeapi.co/api/v2/pokemon/"+value;

  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);

      let gal = document.getElementById("gallery");
      gal.innerHTML = "";

      let pokemon = document.createElement("pokemon-container");
      pokemon.className = "pokemon-container";

      // GET -> pokemon id
      let id = document.createElement("div");
      current_index = json.id; // we will need this for later
      id.innerHTML = "<p><strong>#" + json.id + "</strong></p>";

      // GET -> name of pokemon
      let name = document.createElement("div");
      name.innerHTML = "<h4>" + json.name + "<h4><hr>";

      // GET -> front_default image for pokemon
      let image = document.createElement("div");
      image.innerHTML = "<img src=\""+json.sprites.front_default+"\">";

      // GET -> total number of learnable moves for pokemon
      let num_moves = document.createElement("div");
      num_moves.innerHTML = "<p>Learnable Moves: " + json.moves.length + "</p>";

      let species = document.createElement("div");
      species.innerHTML = "<p>Species: " + json.species.name + "</p>";

      // GET -> type set for pokemon
      let types = document.createElement("div");
      let temp = "";
      for(let i=0; i<json.types.length; i++) {
        temp += json.types[i].type.name;
        if(i != json.types.length-1) temp+= ", ";
      }
      types.innerHTML = "<p>Type: " + temp + "</p>";

      // GET -> stats in a table

      let stat_table = document.createElement("table");
      let stats = json.stats;

      for(let i=0; i<stats.length; i++) {
        if(i===0){
          let stat_heading = document.createElement("tr");
          stat_heading.innerHTML = "<th>Stat</th><th>Base Value</th><th>Effort</th>";
          stat_table.appendChild(stat_heading);
        }
        let stat_row = document.createElement("tr");
        stat_row.innerHTML = "<td>"+stats[i].stat.name+"</td><td>"+stats[i].base_stat+"</td><td>"+stats[i].effort+"</td>";
        stat_table.appendChild(stat_row);
      }

      // let moveset = document.createElement("div");
      // // let temp = "";
      // // for(let i=1; i<json.moves.length; i++) {
      // //   temp += "<p>"+json.moves[i].move.name+"</p>"
      // // }
      // moveset.innerHTML = temp;

      pokemon.appendChild(name);
      pokemon.appendChild(id);
      pokemon.appendChild(image);
      pokemon.appendChild(types);
      pokemon.appendChild(species);
      pokemon.appendChild(num_moves);

      gal.appendChild(pokemon);
      gal.appendChild(document.createElement("br"));
      // gal.appendChild(moveset);
      // GetEvolution(id);
      gal.appendChild(stat_table);
    });
}

function GetEvolution(id) {
  // const url = "https://pokeapi.co/api/v2/evolution-chain/"+id+"/";
  // fetch(url)
  //   .then(function(response) {
  //     return response.json();
  //   }).then(function(json) {
  //     gal = document.getElementById("gallery");
  //
  //     let evolution = document.createElement("div");
  //     evolution.innerHTML = "<p>Evolution: " + json.moves.length + "</p>";
  //
  //     gal.appendChild()
  //   });
}

function GetPrevious() {
  if(current_index === "") {
    console.log("current_index is empty");
    return;
  } else if(current_index === 1) {
    GetPokemon(898);
  }
  else GetPokemon(current_index-1);
}

function GetNext() {
  if(current_index === "") {
    console.log("current_index is empty");
    return;
  } else if(current_index === 898) {
    GetPokemon(1);
  }
  else GetPokemon(current_index+1);
}
