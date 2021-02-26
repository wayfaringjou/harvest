import React from 'react';
import ElementOverview from '../../components/ElementOverview';

const func1 = (e) => console.log(e);

const gardenAreasElement = {
  id: 'areas-overview',
  name: 'Garden Area',
  collection: [{ item: 'item' }],
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
