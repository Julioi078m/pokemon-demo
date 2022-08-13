var offset = 0;

 const  viewData =  (records) => {

    $.ajax({
        url:`http://pokeapi.co/api/v2/pokemon?offset=${records}`,
        method:'GET',
        success: (data) => {
            var pokemonsHTML = document.getElementById('pokemons');
            var output = '';
            $.each(data.results, (index,value) => {
                 new Promise((resolved, reject) => {
                     $.ajax({
                        url:value.url,
                        method:'GET',
                        success: (pokemon) => {
                            resolved(pokemon);
                        },
                        error: (e) => {
                            reject(e);
                        },
                    });
                }).then((pokemon) =>{ 
                    var abilitiesHTML = '';
                    pokemon.abilities.map((p) => {
                        abilitiesHTML += `
                        <ul>
                            <li>
                                ${p.ability.name}
                            </li>
                        </ul>

                        `;
                    })

                output += `
                <div class="card" style="width: 18rem;">
                <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${value.name}</h5>
                  <p class="card-text">${abilitiesHTML}</p>
                  <a href="#" class="btn btn-primary">Base Experience:${pokemon.base_experience}</a>
                </div>
              </div>
                `;
                pokemonsHTML.innerHTML = output;
            })

            });
            
        },
        error: (e) => {
            console.log(e);
        },
    });
}

$(() => {
    $('#btnFirts').click(() => {
        viewData(offset);
        offset=0;
    });
});

    $(() => {
        $('#btnFirstPage').click(() => {
          viewData(offset=0);
          offset=0;
        });
    });
    
    $(() => {
        $('#btnPreviousPage').click(() => {
          viewData(offset-20);
          offset-=20
        });
    });
    
    $(() => {
        $('#btnNextPage').click(() => {
          viewData(offset+20);
          offset+=20
        });
    
    });
    
    $(() => {
        $('#btnLastPage').click(() => {
          viewData(limit=160);
          limit=140
        });
        
});