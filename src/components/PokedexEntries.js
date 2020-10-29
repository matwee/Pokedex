import React from 'react';

function PokedexEntries({poke, setCurrentPokemon, currentPokemon, setImgLoaded, pokemon, offset, setSearchActive, searchActive, widthOver800}) {

    const TYPE_COLOURS = {
        bug: '(177,193,46,',
        dark: '(79,58,45,',
        dragon: '(117,94,223,',
        electric: '(252,188,23,',
        fairy: '(244,177,244,',
        fighting: '(130,53,81,',
        fire: '(231,59,12,',
        flying: '(163,179,247,',
        ghost: '(96,96,178,',
        grass: '(116,194,54,',
        ground: '(211,179,87,',
        ice: '(163,231,253,',
        normal: '(200,196,188,',
        poison: '(147,69,148,',
        psychic: '(237,72,130,',
        rock: '(185,161,86,',
        steel: '(181,181,195,',
        water: '(50,149,246,',
    }

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
        <li 
            className={currentPokemon.name===poke.species.name?'pokedex-entry selected':'pokedex-entry'} 
            onClick={getPokemon}
            style={{background: `linear-gradient(45deg, rgba${TYPE_COLOURS[poke.types[0].type.name]}0.2) 100%, white)`}}
        >
            <div>
                <h2>#{poke.id.toString().padStart(3,0)} {poke.species.name}</h2> 
            </div>
            <img src={poke.sprites.front_default} alt={poke.species.name}/>
        </li>
    );
}

export default PokedexEntries; 

// style={{background: 
//     poke.types[1] === undefined
//     ?`linear-gradient(45deg, rgba${TYPE_COLOURS[poke.types[0].type.name]}0.2) 100%, white)`
//     :`linear-gradient(45deg, rgba${TYPE_COLOURS[poke.types[0].type.name]}0.2) 50%, rgba${TYPE_COLOURS[poke.types[1].type.name]}0.2) 50%)`
// }}



