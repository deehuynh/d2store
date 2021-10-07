import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './Style/index.css';
import './Style/products.css';
import Admin from './Components/CP/Admin';
import Login from './Components/CP/Login';
import Site from './Components/Layout';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Link, Route, Switch, NavLink} from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop';
import {StateProvider} from './Components/StateProvider';
import reducer, {initState} from './Components/reducer';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <Switch>
        
        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/admin'>
          <Admin />
        </Route>

        <Route path='/'>
          <StateProvider initState={initState} reducer={reducer}>
            <Site />
          </StateProvider>
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
