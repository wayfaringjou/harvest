import { collection, singleton } from './api-methods';
import { API_BASEPATH } from '../config/api';

const areasPath = `${API_BASEPATH}/garden/areas`;

// Factories for data resources
const gardenArea = ({ path = areasPath, data }) => {
  const area = {
    id: data.id && data.id,
    name: data.name,
    length_cm: data.length_cm && data.lenght_cm,
    width_cm: data.width_cm && data.width_cm,
    path,
  };

  return {
    ...area,
  };
};

export const gardenAreasCollection = ({ data }) => (
  {
    ...gardenArea({ data }),
    ...collection(),
  }
);

export const gardenAreaSingleton = () => (
  {
    ...gardenArea(),
    ...singleton(),
  }
);
