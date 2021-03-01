import { collection, singleton } from './api-methods';
import config from '../config/api';

const areasPath = `${config.API_BASEPATH}/garden/areas`;

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

export const gardenAreasCollection = () => ({
  // console.log(data);
  // const areas = { data };
  // ...areas,
  ...collection({ path: areasPath }),
});
export const gardenAreaSingleton = () => (
  {
    ...gardenArea(),
    ...singleton(),
  }
);
