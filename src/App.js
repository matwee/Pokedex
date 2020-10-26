import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Pokedex from './components/Pokedex';
import About from './components/About';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/">
            <Redirect to="/pokedex" />
          </Route>
          <Route path='/pokedex' exact component={Pokedex} />
          <Route path='/about' exact component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
