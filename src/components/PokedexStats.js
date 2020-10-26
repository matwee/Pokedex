import React from 'react';

function PokedexStats({currentPokemon}) {

    return (
        <div className={currentPokemon.name ==='' ? 'entry-hidden' : 'stats'}>
            <div className='left-stats'>
                <div>
                    <h3>HP: {currentPokemon.stats[0].hp}</h3>
                    <div className='outer-bar'>
                        <div className='inner-bar' style={{width: `${currentPokemon.stats[0].hp/255*100}%`}}></div>
                    </div>
                </div>
                <div>
                    <h3>Attack: {currentPokemon.stats[1].attack}</h3>
                    <div className='outer-bar'>
                        <div className='inner-bar' style={{width: `${currentPokemon.stats[1].attack/180*100}%`}}></div>
                    </div>
                </div>
                <div>
                    <h3>Defense: {currentPokemon.stats[2].defense}</h3>
                    <div className='outer-bar'>
                        <div className='inner-bar' style={{width: `${currentPokemon.stats[2].defense/230*100}%`}}></div>
                    </div>
                </div>
            </div>
            <div className='right-stats'>
                <div>
                    <h3>Sp.Attack: {currentPokemon.stats[3]['special-attack']}</h3>
                    <div className='outer-bar'>
                        <div className='inner-bar' style={{width: `${currentPokemon.stats[3]['special-attack']/180*100}%`}}></div>
                    </div>
                </div>
                <div>
                    <h3>Sp.Defense: {currentPokemon.stats[4]['special-defense']}</h3>
                    <div className='outer-bar'>
                        <div className='inner-bar' style={{width: `${currentPokemon.stats[4]['special-defense']/230*100}%`}}></div>
                    </div>
                </div>
                <div >
                    <h3>Speed: {currentPokemon.stats[5].speed}</h3>
                    <div className='outer-bar'>
                        <div className='inner-bar' style={{width: `${currentPokemon.stats[5].speed/180*100}%`}}></div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default PokedexStats;


