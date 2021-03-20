/* eslint-disable no-unused-vars */
/* eslint camelcase: "off" */
import { apiCollection, apiSingleton } from './api-methods';
import config from '../config/api';
import { trefleCollection, trefleSingleton } from './trefle-methods';
import localStorage from './localStorage-methods';
import { gbifCollection, gbifSingleton } from './gbif-methods';

const ls = localStorage(config.AUTH_TOKEN_KEY);

// Areas and plants collections are from a garden
const gardenPlantsPath = (gardenId) => `${config.API_BASEPATH}/gardens/${gardenId}/plants`;
const gardenAreasPath = (gardenId) => `${config.API_BASEPATH}/gardens/${gardenId}/areas`;
// Individual plants and areas can be accessed without a garden reference
const plantsPath = `${config.API_BASEPATH}/plants`;
const areasPath = `${config.API_BASEPATH}/areas`;
// Notes and gardens are from a user
let notesPath = '';
let userGardensPath = '';

if (ls.getItem()) {
  notesPath = `${config.API_BASEPATH}/users/${ls.decodeUserData().user_id}/garden/notes`;
  userGardensPath = `${config.API_BASEPATH}/users/${ls.decodeUserData().user_id}/gardens`;
}

// Factories for data resources
// Garden areas
export const gardenAreasCollection = (garden_id) => ({
  ...apiCollection({ path: gardenAreasPath(garden_id) }),
});

export const gardenAreaSingleton = ({
  id = '',
  name = '',
  length_cm = '',
  width_cm = '',
  garden_id = '',
} = {}) => {
  const data = {
    id, name, length_cm, width_cm, garden_id, path: areasPath,
  };

  return {
    ...data,
    ...apiSingleton({ data }),
  };
};

// Plants
export const plantsCollection = (garden_id) => ({
  ...apiCollection({ path: gardenPlantsPath(garden_id) }),
  ...trefleCollection(),
  ...gbifCollection(),
});

export const plantSingleton = ({
  id = '',
  name = '',
  garden_id = '',
  area_id = '',
  names = [],
  scientific_name = '',
  sowing = '',
  light = '',
  days_to_harvest = '',
  row_spacing = '',
  spread = '',
  fruit_months = '',
  images = {},
  treflePath = '',
  gbifspecieskey = '',
} = {}) => {
  const data = {
    id,
    name,
    garden_id,
    area_id,
    path: plantsPath,
    names,
    scientific_name,
    sowing,
    light,
    days_to_harvest,
    row_spacing,
    spread,
    fruit_months,
    images,
    treflePath,
    gbifspecieskey,
  };
  return {
    ...data,
    ...apiSingleton({ data }),
    ...trefleSingleton(),
    ...gbifSingleton({ speciesKey: gbifspecieskey }),
  };
};

// Notes
export const notesCollection = ({ path = notesPath } = {}) => {
  const data = { path };
  return {
    ...apiCollection({ ...data }),
  };
};

export const noteSingleton = ({
  id = '',
  user_id = '',
  garden_id = '',
  area_id = '',
  plant_id = '',
  content = '',
  title = '',
  path = notesPath,
} = {}) => {
  const data = {
    id, user_id, garden_id, area_id, plant_id, content, title, path,
  };

  return {
    ...data,
    ...apiSingleton({ data }),
  };
};

// Garden
export const gardenSingleton = ({
  id = '',
  user_id = '',
  name = '',
  path = userGardensPath,
} = {}) => {
  const data = {
    id,
    user_id,
    name,
    path,
  };
  return {
    ...data,
    ...apiSingleton({ data }),
    // ...localStorage(config.AUTH_TOKEN_KEY),
  };
};
