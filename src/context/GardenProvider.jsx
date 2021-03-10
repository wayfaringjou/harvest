/* eslint-disable no-unused-vars */
import React, { createContext, useRef } from 'react';
import PropTypes from 'prop-types';
import useAuthContext from '../hooks/useAuthContext';

import useAPIRetrieve from '../hooks/useAPIRetrieve';
import { gardenSingleton } from '../services/resources';
import { fetchGarden } from '../services/fakeAPI';

export const GardenContext = createContext();

const garden = gardenSingleton();
const GardenProvider = ({ children }) => {
  const gardenData = useRef(null);

  const { isAuthenticated } = useAuthContext();

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  // } = useAPIRetrieve(garden.getFromPath, isAuthenticated);
  } = useAPIRetrieve(fetchGarden, isAuthenticated);

  if (isAuthenticated && (!gardenData.current)) {
    if (data) {
      // eslint-disable-next-line prefer-destructuring
      gardenData.current = data[0];
    }
  }
  const value = {
    gardenData,
    isRetrieving,
    isFailed,
    error,
  };

  return (
    <GardenContext.Provider value={value}>{children}</GardenContext.Provider>
  );
};

GardenProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.object]),
};

GardenProvider.defaultProps = {
  children: {},
};

export default GardenProvider;
