import React, {useState, useEffect} from 'react';
import PokedexEntries from './PokedexEntries';
import PokedexEntry from './PokedexEntry';
import PokedexStats from './PokedexStats';
import Search from './Search';
import Evos from './Evos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Pokedex({region, entriesLoaded, setEntriesLoaded}) {

    //run fetchItems and widthHandler on load
    useEffect(()=>{
        fetchItems(region.limit,region.offset);
        widthHandler();
    }, []);

    //declaring states
    const [currentPokemon, setCurrentPokemon]= useState({
        name:'', 
        id: '',
        height: '',
        weight: '',
        types: [],
        abilities: [],
        stats: [{},{},{},{},{},{}],
        imgURL:'',
        description: '',
        evoChain: ['',[
            {speciesName:'',chain:0, id:'', url:'', form:'', }
        ]]
    });
    const [currentEvoChain,setCurrentEvoChain] = useState([]);
    const [matches, setMatches] = useState([]);
    const [pokemon, setPokemon]= useState([]);
    const [searchResult, setSearchResult] = useState('');
    const [imgLoaded, setImgLoaded] = useState(false);
    const [searchActive, setSearchActive] = useState(true);
    const [widthOver800, setWidthOver800] = useState(false);
    
    //debounce function
    const debounce = (func, wait = 20, immediate = true) => {
    var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
            }
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        }
    }
    
    //function to check window width and set widthOver800
    const widthHandler = () =>{
        window.innerWidth > 800 ? setWidthOver800(true) : setWidthOver800(false);
    }

    const searchBtnHandler = () =>{
        setSearchActive(!searchActive);
    }

    //window event listener for width changes
    window.addEventListener('resize', debounce(widthHandler));

    //fetching pokemon info on page load
    const fetchItems = async (x,y) =>{
        setEntriesLoaded(false);
        try{
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${x}&offset=${y}`);
            const entries = await data.json();
            const pokes = entries.results;
            const allData = await Promise.all( pokes.map( async (entry) =>{
                //fetching general data
                const data = await fetch (entry.url);
                const pokeData = await data.json();
                //fetching descriptions
                const descriptionsRequest = await fetch(pokeData.species.url);
                const descriptions = await descriptionsRequest.json();
                let description = '';
                descriptions['flavor_text_entries'].some( entry =>{
                    if(entry.language.name ==='en'){
                        description = entry['flavor_text'];
                    }
                });
                pokeData.description = description;
                //fetching evolution chains
                if(descriptions['evolution_chain']===null){
                    const evoChain = [{
                        speciesName: pokeData.species.name, 
                        chain: null,
                        id: pokeData.id
                    }];
                    pokeData.evoChain = evoChain;
                    return pokeData;
                }else{
                    const evosRequest = await fetch(descriptions['evolution_chain'].url);
                    const evos = await evosRequest.json();
                    let evoChain = [];
                    let evoData = evos.chain;
                    let chain = 0;
                    do{
                        let numOfEvos = evoData['evolves_to'].length;
                        let arr = evoData.species.url.split('/');
                        let id = parseInt(arr[6]);
                        evoChain.push({
                            //conditional statement due to inconsistencies in pokeAPI
                            // speciesName: numOfEvos===0 && chain===0? pokeData.name : evoData.species.name,
                            speciesName: evoData.species.name,
                            chain: chain,
                            id: id
                        });
                        if(numOfEvos > 1){
                            for(let i = 1; i < numOfEvos; i++){
                                let arr = evoData['evolves_to'][i].species.url.split('/');
                                let id = parseInt(arr[6]);
                                evoChain.push({
                                    speciesName: evoData['evolves_to'][i].species.name,
                                    chain: chain+1,
                                    id: id
                                });
                            }
                        }
                        //updating evoData to dig deeper into nested object
                        evoData = evoData['evolves_to'][0];
                        chain++;
                    }while(!!evoData && evoData.hasOwnProperty('evolves_to'));
                    pokeData.evoChain = evoChain;
                    return pokeData;
                }
            }));
            setPokemon(allData);
        }catch (error){
            console.log(error);
        }
    }

    //returning JSX
    return(
        <div className='wrapper'>
            <div className='pokedex'>
                <div onLoad={()=> setEntriesLoaded(true)} className={widthOver800? 'entries-components': (!searchActive?'hidden':'entries-components')}>
                    <Search 
                        pokemon={pokemon}
                        searchResult={searchResult}
                        setSearchResult={setSearchResult}
                        setMatches={setMatches}
                    />
                    <ul className='pokedex-entries'>
                        {entriesLoaded ? null : (
                            <div className='loading-wrapper'>
                                <div className='pokeball-wrapper'>
                                    <div className='pokeball'></div>
                                </div>
                                <h1>Loading Pokédex..</h1>
                            </div>
                        )}
                        {searchResult.length > 0 && matches.length === 0 ? (
                            <div className='no-matches'>
                                <h2>Sorry, no matches found.</h2>
                            </div>
                        ) : (
                            <div>
                                { searchResult.length > 0 && matches.length >0 ? (
                                    <div>
                                        {matches.map( poke=>
                                            <PokedexEntries 
                                                key={poke.id}
                                                id={poke.id}
                                                name={poke.species.name}
                                                sprite={poke.sprites.front_default}
                                                poke={poke}
                                                setCurrentPokemon={setCurrentPokemon}
                                                currentPokemon={currentPokemon}
                                                setImgLoaded={setImgLoaded}
                                                pokemon={pokemon}
                                                offset={region.offset}
                                                setSearchActive={setSearchActive}
                                                searchActive={searchActive}
                                                widthOver800={widthOver800}
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        {pokemon.map( poke=>
                                            <PokedexEntries 
                                                key={poke.id}
                                                id={poke.id}
                                                name={poke.species.name}
                                                sprite={poke.sprites.front_default}
                                                poke={poke}
                                                setCurrentPokemon={setCurrentPokemon}
                                                currentPokemon={currentPokemon}
                                                setImgLoaded={setImgLoaded}
                                                pokemon={pokemon}
                                                offset={region.offset}
                                                setSearchActive={setSearchActive}
                                                searchActive={searchActive}
                                                widthOver800={widthOver800}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </ul>
                </div>
                <div className={widthOver800? 'entry-components': (searchActive?'hidden':'entry-components')}>
                    <button className='btn-toggle-search' onClick={searchBtnHandler}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                    <PokedexEntry 
                        currentPokemon={currentPokemon}
                        imgLoaded={imgLoaded}
                        setImgLoaded={setImgLoaded}
                    />
                    <div className='entry-right'>
                        <PokedexStats 
                            currentPokemon={currentPokemon}
                        />
                        <Evos
                            currentPokemon={currentPokemon}
                            setCurrentPokemon={setCurrentPokemon}
                            setImgLoaded={setImgLoaded}
                            pokemon={pokemon}
                            currentEvoChain={setCurrentEvoChain}
                            setCurrentEvoChain={setCurrentEvoChain}
                            offset={region.offset}
                        />
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default Pokedex;
