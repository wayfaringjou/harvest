// React modules
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
// Handlers and services
// import AreasAPIService from './services/areas-api-service';
// import useAPIRequest from './services/useAPIRequest';
// import FH from '../../handlers/form-handlers';
// Components
// import ElementOverview from '../ElementOverview';
import GardenAreasCollection from '../../routes/GardenAreasCollection';
// CSS
import './App.css';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <div className="App">
      {errorMsg && <aside>{errorMsg}</aside>}
      <main className="app-main">
        <Route
          path="/"
          component={GardenAreasCollection}
        />
      </main>
    </div>
  );
}

export default App;
