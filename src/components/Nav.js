import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <div>
      <nav>
          <div className="nav-wrapper">
            <h1>Kanto Region Pokédex</h1>
            <ul className="nav-links">
                <Link to='/pokedex' className='link'>  
                    <li>Pokedex</li> 
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
