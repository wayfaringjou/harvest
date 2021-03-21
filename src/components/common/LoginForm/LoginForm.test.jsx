import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import AuthProvider from '../../../context/AuthProvider';
import GardenProvider from '../../../context/GardenProvider';

describe('App component', () => {
  // Smoke test
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <AuthProvider>
          <GardenProvider>
            <LoginForm />
          </GardenProvider>
        </AuthProvider>
      </BrowserRouter>,
      div,
    );

    ReactDOM.unmountComponentAtNode(div);
  });
});
