import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LocalStorageMock } from '@react-mock/localstorage';
import AuthProvider from '../../../context/AuthProvider';
import { GardenContext } from '../../../context/GardenProvider';
import SearchAreaDialog from './SearchAreaDialog';
import config from '../../../config/api';

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
            <LocalStorageMock items={{
              [config.AUTH_TOKEN_KEY]:
              'e.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2MTYzNTcwNjQsInN1YiI6ImRlbW8ifQ.cl',
            }}
            >
              <SearchAreaDialog match={{ params: 0 }} />
            </LocalStorageMock>
          </GardenContext.Provider>
        </AuthProvider>
      </BrowserRouter>,
      div,
    );

    ReactDOM.unmountComponentAtNode(div);
  });
});
