/* eslint camelcase: "off" */
import { apiCollection, apiSingleton } from './api-methods';
import config from '../config/api';
import { trefleCollection } from './trefle-methods';

const areasPath = `${config.API_BASEPATH}/garden/areas`;
const plantsPath = `${config.API_BASEPATH}/garden/plants`;
// Factories for data resources

export const gardenAreasCollection = () => ({
  ...apiCollection({ path: areasPath }),
});

export const gardenAreaSingleton = ({
  id = '',
  name = '',
  length_cm = '',
  width_cm = '',
} = {}) => {
  const data = {
    id,
    name,
    length_cm,
    width_cm,
    path: areasPath,
  };

  return {
    ...data,
    ...apiSingleton({ data }),
  };
};

export const plantsCollection = () => ({
  ...apiCollection({ path: plantsPath }),
  ...trefleCollection(),
});

export const plantSingleton = ({
  id = '',
  name = '',
} = {}) => {
  const data = {
    id,
    name,
    path: plantsPath,
  };

  return {
    ...data,
    ...apiSingleton({ data }),
  };
};
