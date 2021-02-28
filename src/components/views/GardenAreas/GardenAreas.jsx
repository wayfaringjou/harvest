import React from 'react';
import GardenAreasCollection from '../../layout/GardenAreasCollection/GardenAreasCollection';

const areasData = [
  {
    id: 1,
    name: 'Backyard raised bed',
    length_cm: '135',
    width_cm: '150',
  },
  {
    id: 2,
    name: 'Backyard raised bed 2',
    length_cm: '135',
    width_cm: '150',
  },
];

const areasActions = [
  {
    action: 'Add new area',
    desc: 'Add a representation of an area of your garden',
    handler: func1,
  },
];

const GardenAreas = () => {
  if (isLoading) return <p>Loading</p>;

  return (
    <GardenAreasCollection />
  );
};

export default GardenAreas;
