import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

function Nav({region, setRegion, entriesLoaded}) {

  const navRegionHandler = (e) =>{
    if(e.currentTarget.getAttribute('href')==='/'){
      setRegion({region:'React', offset:'',limit:''});
    }else if(e.currentTarget.getAttribute('href')==='/pokedex' && region.region==='React'){
      setRegion({region:'kanto', offset:'0',limit:'151'});
    }
  }

  return (
    <div>
      <nav>
        <div className={entriesLoaded? "nav-wrapper" : "nav-wrapper disabled"}>
          <Link to='/' className='link' onClick={navRegionHandler}> 
            <h1>{region==='React'? 'React' : region.region} Pokédex</h1>
          </Link>   
          <ul className="nav-links">
              <Link to='/pokedex' className='link' onClick={navRegionHandler}>  
                  <li>Pokédex</li> 
              </Link>               
              <Link to='/about' className='link'>  
                  <li>About</li> 
              </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
