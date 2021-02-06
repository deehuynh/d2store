import React from 'react';
import ReactDOM from 'react-dom';
import './Style/index.css';
import Admin from './Components/CP/Admin';
import Site from './Components/Layout';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Link, Route, Switch, NavLink} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        
        <Route path='/admin'>
          <Admin />
        </Route>

        <Route path='/'>
          <Site />
        </Route>
        
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
