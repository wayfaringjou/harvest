// React modules
import React, {
  useState, lazy, Suspense,
} from 'react';
import { Switch } from 'react-router-dom';

// Routes
import {
  HOME,
  GARDEN,
  GARDEN_AREAS,
  NOTE_DETAIL,
  PLANTS,
  GARDEN_AREA_DETAIL,
  PLANT_DETAIL,
} from './config/routes';

// CSS
import './App.css';

// Components
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import Header from './components/common/Header';

// Using lazy in combination with suspense for lazy loading of components
const Home = lazy(() => import('./components/views/Home'));
const Garden = lazy(() => import('./components/views/Garden'));
const GardenAreas = lazy(() => import('./components/views/GardenAreas'));
const Plants = lazy(() => import('./components/views/Plants'));
const NoteDetail = lazy(() => import('./components/views/NoteDetail'));
const GardenAreaDetail = lazy(() => import('./components/views/GardenAreaDetail/GardenAreaDetail'));
const PlantDetail = lazy(() => import('./components/views/PlantDetail'));

function App() {
  // eslint-disable-next-line no-unused-vars
  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <Suspense fallback="Loading...">
      <div className="App">
        <Header />
        {errorMsg && <aside>{errorMsg}</aside>}
        <main className="app-main">
          <Switch>
            <PublicRoute
              exact
              path={HOME}
              component={Home}
            />
            <PrivateRoute
              exact
              path={GARDEN}
              component={Garden}
            />
            <PrivateRoute
              exact
              path={GARDEN_AREAS}
              component={GardenAreas}
            />
            <PrivateRoute
              exact
              path={GARDEN_AREA_DETAIL}
              component={GardenAreaDetail}
            />
            <PrivateRoute
              exact
              path={PLANTS}
              component={Plants}
            />
            <PrivateRoute
              exact
              path={PLANT_DETAIL}
              component={PlantDetail}
            />
            <PrivateRoute
              exact
              path={NOTE_DETAIL}
              component={NoteDetail}
            />
          </Switch>
        </main>
      </div>
    </Suspense>
  );
}

export default App;
