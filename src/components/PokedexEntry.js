import React from 'react';
import {useTransition, animated} from 'react-spring';

function PokedexEntry({currentPokemon, imgLoaded, setImgLoaded}) {
    
    const transitions = useTransition(currentPokemon, currentPokemon.id, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0, display: 'none'},
    })

    const TYPE_COLOURS = {
        bug: 'B1C12E',
        dark: '4f3a2d',
        dragon: '755edf',
        electric: 'fcbc17',
        fairy: 'f4b1f4',
        fighting: '823551',
        fire: 'e73b0c',
        flying: 'a3b3f7',
        ghost: '6060b2',
        grass: '74c236',
        ground: 'd3b357',
        ice: 'a3e7fd',
        normal: 'c8c4bc',
        poison: '934594',
        psychic: 'ed4882',
        rock: 'b9a156',
        steel: 'b5b5c3',
        water: '3295f6',
    }

    return transitions.map(({ key, props})=>
        <animated.div style={props} key={key} className={currentPokemon.name ==='' ? 'entry-hidden' : 'entry'}>
            <h1 className='name'>{currentPokemon.name} #{currentPokemon.id} </h1>
            <div className='types'>
                {currentPokemon.types.map( type =>(
                    <h2 key={type} className='type' style={{backgroundColor: `#${TYPE_COLOURS[type]}`, color: 'white'}}>
                        {[type]}
                    </h2>
                ))}
            </div>
            <div className='img-wrapper'>
                {imgLoaded ? null : (
                    <div className='pokeball-wrapper'>
                        <div className='pokeball'></div>
                    </div>
                )}
                <img 
                    style={imgLoaded ? {} : { display: 'none' }}
                    src={currentPokemon.imgURL} 
                    alt={currentPokemon.name}
                    onLoad={() => setImgLoaded(true)}
                />
            </div>
            <div className='info-card'>
                <div className='description'>
                    <h3>Description:</h3>
                    <p>{currentPokemon.description}</p>
                </div>
                <div className='general-info'>
                    <h3 className='height'>Height: {(currentPokemon.height/10).toFixed(1)} <span className='m'>m</span></h3>
                    <h3 className='weight'>Weight: {(currentPokemon.weight/10).toFixed(1)} <span className='kg'>kg</span></h3>
                    <div className='abilities-card'>
                        <h3>Abilities:</h3>
                        <ul className='abilities'>
                            {currentPokemon.abilities.map( ability =>(
                                <li className='ability' key={ability}>{[ability]}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div> 
        </animated.div>
    );
}

export default PokedexEntry; 
