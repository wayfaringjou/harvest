import React from 'react';
import PropTypes from 'prop-types';
import ElementOverview from '../../common/ElementOverview';
import gardenAreaPropStyle from '../../../propTypes/gardenArea';

const handleAddGardenArea = (e, data) => {
  e.preventDefault();
  console.log(data);
};

const addGardenAreaDialog = (data) => (
  <form onSubmit={(e) => handleAddGardenArea(e, data)}>
    <label htmlFor="area-name">
      <p>New area name:</p>
      <input
        id="area-name"
        type="text"
        placeholder="'Raised bed', 'Backyard'"
      />
    </label>
    <button
      type="submit"
    >
      Submit
    </button>
  </form>
);

const renderCollection = (items) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <p>{item.name}</p>
        <p>
          {item.length_cm && `Lenght: ${item.length_cm}cm`}
        </p>
        <p>
          {item.width_cm && `Width: ${item.width_cm}cm`}
        </p>
      </li>
    ))}
  </ul>
);

const GardenAreasCollection = ({ data }) => {
// Element overview component takes this object
  const gardenAreasElement = {
    id: 'areas-overview',
    name: 'Garden Area',
    collection: data,
    prompts: [{
      action: 'Add new area',
      desc: 'Add a representation of an area of your garden',
      dialog: addGardenAreaDialog(),
      handler: handleAddGardenArea,
    }],
  };
  console.log(gardenAreasElement);
  return (
    <section id="garden-areas-collection">
      <h2>Garden areas Collection</h2>
      <ElementOverview
        element={gardenAreasElement}
        renderCollection={renderCollection}
      />
    </section>
  );
};

GardenAreasCollection.propTypes = {
  data: PropTypes.arrayOf(gardenAreaPropStyle),
};

GardenAreasCollection.defaultProps = {
  data: [],
};

export default GardenAreasCollection;
