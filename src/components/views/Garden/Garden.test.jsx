import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../../../context/AuthProvider';
import { GardenContext } from '../../../context/GardenProvider';
import Garden from './Garden';

describe('App component', () => {
  // Smoke test
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const gardenData = { current: { id: 1 } };
    ReactDOM.render(
      <BrowserRouter>
        <AuthProvider>
          <GardenContext.Provider value={{
            gardenData, isRetrieving: false, isFailed: false, error: '',
          }}
          >
            <Garden />
          </GardenContext.Provider>
        </AuthProvider>
      </BrowserRouter>,
      div,
    );

    ReactDOM.unmountComponentAtNode(div);
  });
});
