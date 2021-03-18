import React, {
  createContext, useRef,
} from 'react';
import PropTypes from 'prop-types';
import useAuthContext from '../hooks/useAuthContext';

import useAPIRetrieve from '../hooks/useAPIRetrieve';
import { gardenSingleton } from '../services/resources';
import config from '../config/api';

export const GardenContext = createContext();

const GardenProvider = ({ children }) => {
  const gardenData = useRef(null);
  const { isAuthenticated, logedUser } = useAuthContext();

  let garden = gardenSingleton();

  if (logedUser) {
    garden = gardenSingleton({
      user_id: logedUser.user_id,
      path: `${config.API_BASEPATH}/users/${logedUser.user_id}/gardens`,
    });
  }

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  } = useAPIRetrieve(garden.getFromPath, logedUser, !logedUser);

  if (isAuthenticated && (!gardenData.current)) {
    if (data) {
      // eslint-disable-next-line prefer-destructuring
      gardenData.current = data[0];
    }
  } else if (!isAuthenticated && (gardenData.current)) {
    gardenData.current = '';
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
