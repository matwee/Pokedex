import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Search({pokemon, searchResult, setSearchResult, setMatches}) {

    useEffect(()=>{
        matchesHandler();
    }, [searchResult]);

    const searchHandler = (e) =>{
        setSearchResult(e.target.value.toLowerCase());
        setMatches(pokemon.filter(result =>{
            return result.name.match(searchResult);
        }))
    }

    const matchesHandler = (e) =>{
        setMatches(pokemon.filter(result =>{
            return result.name.match(searchResult);
        }))
    }

    const clearMatches = (e) =>{
        e.preventDefault();
        e.currentTarget.previousSibling.value='';
        setMatches(pokemon);
        setSearchResult('');
    }

    return (
        <form className='search'>
             <input onChange={searchHandler} type='text' name='search' id='search' placeholder='Search' autoComplete='off'></input>
             <button onClick={clearMatches} value='reset' className='reset-search'>
                <FontAwesomeIcon icon={faTimes} />
             </button>
        </form>
    )
}

export default Search;