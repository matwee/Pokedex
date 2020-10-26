import React from 'react';

function PokedexEntries({id, name, sprite, poke, setCurrentPokemon, currentPokemon, setImgLoaded, pokemon, offset, setSearchActive, searchActive, widthOver800}) {

    const pokeNames = pokemon.map( poke =>{
        return poke.species.name;
    });
    const pokeURLS = pokemon.map( poke=>{
        return poke.sprites.front_default;
    });
    //filtering chains to only include Gen 1 pokemon
    const filteredEvoChain = poke.evoChain.filter(chain=>pokeNames.includes(chain.speciesName));
    //mapping through chain to add forms and imgURLs
    let mappedEvoChain = filteredEvoChain.map( chain =>{
        chain.url = pokeURLS[chain.id-1-offset];
        let form;
        if(chain.chain === 0){
            form = 'base form'
        }else if(chain.chain===1){
            form ='1st evolution'
        }else if(chain.chain===2){
            form = '2nd evolution'
        }
        chain.form = form;
        return chain
    });
    const getPokemon = () =>{
        if(poke.evoChain[0].chain===null) return;
        setCurrentPokemon({
            name:poke.species.name, 
            id: poke.id.toString().padStart(3,0),
            height: poke.height,
            weight: poke.weight,
            types: poke.types.map(el =>{
                return el.type.name;
            }),
            abilities: poke.abilities.map( el =>{
                return el.ability.name;
            }),
            stats: poke.stats.map( el =>{
                let statObj = {};
                statObj[el.stat.name] = el['base_stat'] ;
                return statObj;
            }),
            imgURL: poke.sprites.other['official-artwork']['front_default'] ? poke.sprites.other['official-artwork']['front_default'] : poke.sprites['front_default'] ,
            description: poke.description,
            evoChain: [mappedEvoChain[0]===undefined? null : mappedEvoChain[0].speciesName, mappedEvoChain],
        });
        (currentPokemon.id !== poke.id.toString().padStart(3,0)) ? setImgLoaded(false) : setImgLoaded(true);
        if(!widthOver800){
            setSearchActive(!searchActive);
        }
    }

    return (
        <li className={currentPokemon.name===poke.name?'pokedex-entry selected':'pokedex-entry'} onClick={getPokemon}>
            <div>
                <h2>#{id.toString().padStart(3,0)} {name}</h2> 
            </div>
            <img src={sprite} alt={name}/>
        </li>
    );
}

export default PokedexEntries; 

