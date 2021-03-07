/* eslint-disable react/jsx-props-no-spreading */
// If user is logged in redirects to garden route
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuthContext from '../../../hooks/useAuthContext';
import { GARDEN } from '../../../config/routes';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated ? <Redirect to={GARDEN} /> : <Component {...props} />)}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};
export default PublicRoute;
