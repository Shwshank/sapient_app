import React from 'react';
import './App.css';

import {
  Switch,
  Route,
} from "react-router-dom";

import Filter from './components/Filter'
import DisplayAssets from './components/DisplayAssets'

function App() {

  return (
    <div className='App' data-test="appComponent">
      <h3>SpaceX launch programs </h3>
      <div className=" container">
        <div className="row justify-content-md-center">
          <Filter/>
            <Switch>
              <Route exact path='/'>
                <DisplayAssets/>
              </Route>
              <Route path='/:year?/:landing?/:launch?'>
                <DisplayAssets/>
              </Route>
            </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
