/* eslint camelcase: "off" */

import { apiCollection, apiSingleton } from './api-methods';
import config from '../config/api';

const areasPath = `${config.API_BASEPATH}/garden/areas`;

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
