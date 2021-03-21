/* eslint-disable react/jsx-props-no-spreading */
// If user is not logged in this redirects them to home
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuthContext from '../../../hooks/useAuthContext';
import { HOME } from '../../../config/routes';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to={HOME} />)}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.element, PropTypes.func]),
};

PrivateRoute.defaultProps = {
  component: () => (<></>),
};

export default PrivateRoute;
