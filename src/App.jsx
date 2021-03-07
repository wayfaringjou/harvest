// React modules
import React, { useState, lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';

// Handlers and services
// import AreasAPIService from './services/areas-api-service';
// import useAPIRequest from './services/useAPIRequest';
// import FH from '../../handlers/form-handlers';

// Routes
import {
  HOME,
  GARDEN_AREAS,
  // GARDEN_AREA_DETAIL,
  PLANTS,
} from './config/routes';

// CSS
import './App.css';

// Components
import PrivateRoute from './components/routes/PrivateRoute';
// import RegistrationForm from './components/common/RegistrationForm';
import AuthProvider from './context/AuthProvider';
import LoginForm from './components/common/LoginForm';
import PublicRoute from './components/routes/PublicRoute';

const GardenAreas = lazy(() => import('./components/views/GardenAreas'));
const Plants = lazy(() => import('./components/views/Plants'));

function App() {
  // eslint-disable-next-line no-unused-vars
  const [errorMsg, setErrorMsg] = useState(null);
  return (
    <Suspense fallback="Loading...">
      <AuthProvider>
        <div className="App">
          {errorMsg && <aside>{errorMsg}</aside>}
          <main className="app-main">
            <Switch>
              <PrivateRoute
                path={GARDEN_AREAS}
                component={GardenAreas}
              />
              <PrivateRoute
                path={PLANTS}
                component={Plants}
              />
              <PublicRoute
                path={HOME}
                component={() => (
                  <>
                    <LoginForm />
                  </>
                )}
              />
            </Switch>
          </main>
        </div>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
