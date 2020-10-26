import React, {useEffect} from 'react';
import {useTransition, animated} from 'react-spring';

function Evos({currentPokemon, pokemon, setImgLoaded, setCurrentPokemon, currentEvoChain, setCurrentEvoChain, offset}) {
    
    useEffect(()=>{ 
        setCurrentEvoChain(currentPokemon.evoChain);
    }, [currentPokemon]);

    const transitions = useTransition(currentEvoChain, currentPokemon.evoChain[0], {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0, display: 'none'},
      });

    //same process as getPokemon in PokedexEntries.js, except since the data is not tied to the evo chains, we must filter through pokemon to find the data for the respective chain poke
    //also, since the mapped chains are not actually tied to the pokemon state but instead injected into currentPokemon, we must recreate them here based on the evo chain pokes
    const getPokemon = (e) =>{
        let poke = pokemon.filter( poke =>{
            return poke.species.name === e.currentTarget.getAttribute('name')
        })
        const pokeNames = pokemon.map( poke =>{
            return poke.species.name;
        })
        const pokeURLS = pokemon.map( poke=>{
            return poke.sprites.front_default;
        })
        //filtering chains to only include Gen 1 pokemon
        const filteredEvoChain = poke[0].evoChain.filter(chain=>pokeNames.includes(chain.speciesName));
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
            return chain;
        });
        setCurrentPokemon({
            name:poke[0].species.name, 
            id: poke[0].id.toString().padStart(3,0),
            height: poke[0].height,
            weight: poke[0].weight,
            types: poke[0].types.map(el =>{
                return el.type.name;
            }),
            abilities: poke[0].abilities.map( el =>{
                return el.ability.name;
            }),
            stats: poke[0].stats.map( el =>{
                let statObj = {};
                statObj[el.stat.name] = el['base_stat'] ;
                return statObj;
            }),
            imgURL: poke[0].sprites.other['official-artwork']['front_default'] ? poke[0].sprites.other['official-artwork']['front_default'] : poke[0].sprites['front_default'],
            description: poke[0].description,
            evoChain: [mappedEvoChain[0]===undefined? null : mappedEvoChain[0].speciesName, mappedEvoChain],
        });
        (currentPokemon.id !== poke[0].id.toString().padStart(3,0)) ? setImgLoaded(false) : setImgLoaded(true);
    }

    return transitions.map(({ key, props})=>
        <animated.div style={props} key={key} className={currentPokemon.name ==='' ? 'entry-hidden' : 'evos'}>
            <div className='evos-card'>
                <h3>Evolutions:</h3>
                <div className ='evos-wrapper'>
                    {currentPokemon.evoChain[1].map( chain =>(
                        <div onClick={getPokemon} name={chain.speciesName} className='evo' key={chain.id}>
                            <img src={chain.url} alt={chain.speciesName}></img>
                            <h4 className='name'>#{chain.id.toString().padStart(3,0)} {chain.speciesName}</h4>
                            <h4 className='form'>{chain.form}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </animated.div>
    );
}

export default Evos;
