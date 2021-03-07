import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import config from '../config/api';
import storageAccess from '../services/localStorage-methods';
import credentials from '../services/api-auth-service';
import useAPISend from '../hooks/useAPISend';

// Create a new context with no default values
export const AuthContext = createContext();

// This is a wrapper component to the actual AuthContext proivder
const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginRequest, setLoginRequest] = useState(false);
  const [loginFunction, setLoginFunction] = useState(null);

  // Create token with storage access and credential methods
  const token = {
    ...storageAccess(config.AUTH_TOKEN_KEY),
    ...credentials({ user_name: userName, password }),
  };

  // Using the same hook employed for sending data to api
  const {
    requestState,
    setRequestState,
  } = useAPISend(loginFunction, loginRequest);

  const {
    isSubmitting, submitSuccess, submitError, submitResponse,
  } = requestState;

  // If the post request done by the hook is successful store token and
  // reset hook's state

  if (submitSuccess) {
    token.setItem(submitResponse.authToken);
    setUserName('');
    setPassword('');
    setRequestState({ ...requestState, submitSuccess: false, submitError: null });
  }

  // isAuthenticated is a check if the user has a token in their storage
  const isAuthenticated = Boolean(token.getItem());

  // login is storing a token in local storage
  const login = (e) => {
    e.preventDefault();
    setLoginFunction({ request: token.getToken });
    setLoginRequest(!loginRequest);
  };

  // logout is removing the token from local storage
  const logout = token.removeItem;

  const value = {
    isAuthenticated,
    login,
    loginStatus: { isSubmitting, submitSuccess, submitError },
    logout,
    setUserName,
    setPassword,
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
