/* eslint camelcase: "off" */
import { apiCollection, apiSingleton } from './api-methods';
import config from '../config/api';
import { trefleCollection } from './trefle-methods';
import localStorage from './localStorage-methods';

const ls = localStorage(config.AUTH_TOKEN_KEY);

const areasPath = `${config.API_BASEPATH}/garden/areas`;
const plantsPath = `${config.API_BASEPATH}/garden/plants`;
const notesPath = `${config.API_BASEPATH}/users/${ls.decodeUserData().user_id}/garden/notes`;
console.log(notesPath);
// Factories for data resources

export const gardenAreasCollection = () => ({
  ...apiCollection({ path: areasPath }),
});

export const gardenAreaSingleton = ({
  id = '',
  name = '',
  length_cm = '',
  width_cm = '',
  garden_id = '',
} = {}) => {
  const data = {
    id,
    name,
    length_cm,
    width_cm,
    garden_id,
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
  garden_id = '',
  area_id = '',
} = {}) => {
  const data = {
    id,
    name,
    garden_id,
    area_id,
    path: plantsPath,
  };

  return {
    ...data,
    ...apiSingleton({ data }),
  };
};

export const notesCollection = () => ({
  ...apiCollection({ path: notesPath }),
});

export const noteSingleton = ({
  id = '',
  user_id = '',
  garden_id = '',
  area_id = '',
  plant_id = '',
  content = '',
  title = '',
} = {}) => {
  const data = {
    id,
    user_id,
    garden_id,
    area_id,
    plant_id,
    content,
    title,
  };

  return {
    ...data,
    ...apiSingleton({ data }),
  };
};
