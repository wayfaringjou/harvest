import React from 'react';
import ElementOverview from '../../common/ElementOverview';

const func1 = (e) => console.log(e);

const gardenAreasElement = {
  id: 'areas-overview',
  name: 'Garden Area',
  collection: [{
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
  }],
  prompts: [
    {
      action: 'Add new area',
      desc: 'Add a representation of an area of your garden',
      handler: func1,
    },
  ],
};

const GardenAreasCollection = () => (
  <section id="garden-areas-collection">
    <h2>Garden areas Collection</h2>
    <ElementOverview
      element={gardenAreasElement}
    />
  </section>
);

export default GardenAreasCollection;
