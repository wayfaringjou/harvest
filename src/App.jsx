// React modules
import React, { useState, lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';

// Handlers and services

// Routes
import {
  HOME,
  GARDEN,
  GARDEN_AREAS,
  // GARDEN_AREA_DETAIL,
  PLANTS,
} from './config/routes';

// CSS
import './App.css';

// Components
import PrivateRoute from './components/routes/PrivateRoute';
import AuthProvider from './context/AuthProvider';
import PublicRoute from './components/routes/PublicRoute';
import Header from './components/common/Header';

const Home = lazy(() => import('./components/views/Home'));
const Garden = lazy(() => import('./components/views/Garden'));
const GardenAreas = lazy(() => import('./components/views/GardenAreas'));
const Plants = lazy(() => import('./components/views/Plants'));

function App() {
  // eslint-disable-next-line no-unused-vars
  const [errorMsg, setErrorMsg] = useState(null);
  return (
    <Suspense fallback="Loading...">
      <AuthProvider>
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
                path={PLANTS}
                component={Plants}
              />
            </Switch>
          </main>
        </div>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
