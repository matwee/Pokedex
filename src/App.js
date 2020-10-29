import React, {useState} from 'react';
import './App.css';
import Nav from './components/Nav';
import Pokedex from './components/Pokedex';
import About from './components/About';
import Home from './components/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  const [entriesLoaded, setEntriesLoaded] = useState(true);
  const [region, setRegion] = useState({
    region:'React',
    offset:'',
    limit:''
  });

  return (
    <Router>
      <div className="App">
        <Nav 
          region={region} 
          setRegion={setRegion}
          entriesLoaded={entriesLoaded}
        />
        <Switch>
          <Route path='/' exact 
            render = {(props)=>(
              <Home 
                setRegion={setRegion}
              />
            )}
          />
          <Route path='/pokedex' exact 
            render = {(props)=>(
              <Pokedex 
                region={region}
                entriesLoaded={entriesLoaded}
                setEntriesLoaded={setEntriesLoaded}
              />
            )}
          />
          <Route path='/about' exact component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
