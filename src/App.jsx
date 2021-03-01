// React modules
import React, { useState, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

// Handlers and services
// import AreasAPIService from './services/areas-api-service';
// import useAPIRequest from './services/useAPIRequest';
// import FH from '../../handlers/form-handlers';

// Routes
import {
  GARDEN_AREAS,
  // GARDEN_AREA_DETAIL,
} from './config/routes';

// CSS
import './App.css';

// Components
const GardenAreas = lazy(() => import('./components/views/GardenAreas'));

function App() {
  // eslint-disable-next-line no-unused-vars
  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <Suspense fallback="Loading...">
      <div className="App">
        {errorMsg && <aside>{errorMsg}</aside>}
        <main className="app-main">
          <h4>App</h4>
          <Route
            path={GARDEN_AREAS}
            component={GardenAreas}
          />
        </main>
      </div>
    </Suspense>
  );
}

export default App;
