import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import config from '../config/api';
// import { HOME } from '../config/routes';
import storageAccess from '../services/localStorage-methods';
import credentials from '../services/api-auth-service';
import useAPISend from '../hooks/useAPISend';

// Create a new context with no default values
export const AuthContext = createContext();

// This is a wrapper component to the actual AuthContext proivder
const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [authRequest, setAuthRequest] = useState(false);
  const [authFunction, setAuthFunction] = useState(null);
  // isAuthenticated is a check if the user has a token in their storage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Create token with storage access and credential methods
  const token = {
    ...storageAccess(config.AUTH_TOKEN_KEY),
    ...credentials({ user_name: userName, password }),
  };

  // Using the same hook employed for sending data to api
  const {
    requestState,
    setRequestState,
  } = useAPISend(authFunction, authRequest);

  const {
    isSubmitting, submitSuccess, submitError, submitResponse,
  } = requestState;

  // login is storing a token in local storage
  const login = (e) => {
    e.preventDefault();
    setAuthFunction({ request: token.getToken });
    setAuthRequest(!authRequest);
  };

  // logout is removing the token from local storage
  // const history = useHistory();
  const logout = () => {
    // e.preventDefault();
    token.removeItem();
    setIsAuthenticated(false);
    // return history.push(HOME);
  };

  // Add user
  const addNewUser = (e) => {
    e.preventDefault();
    setAuthFunction({ request: token.postNewUser });
    setAuthRequest(!authRequest);
  };

  // If the post request done by the hook is successful store token and
  // reset hook's state

  if (submitSuccess) {
    if (submitResponse.authToken) {
      token.setItem(submitResponse.authToken);
      setUserName('');
      setPassword('');
      setIsAuthenticated(Boolean(token.getItem()));
      setRequestState({
        ...requestState, submitSuccess: false, submitError: null, submitResponse: null,
      });
    } else if (submitResponse.user_name) {
      setRequestState({ ...requestState, submitSuccess: false, submitError: null });
      setAuthFunction({ request: token.getToken });
      setAuthRequest(!authRequest);
    }
  }

  const value = {
    isAuthenticated,
    login,
    authStatus: { isSubmitting, submitSuccess, submitError },
    logout,
    setUserName,
    setPassword,
    addNewUser,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.object]),
};

AuthProvider.defaultProps = {
  children: {},
};

export default AuthProvider;
