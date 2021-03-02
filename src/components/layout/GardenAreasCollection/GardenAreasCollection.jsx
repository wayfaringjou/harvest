import React from 'react';
import PropTypes from 'prop-types';
import ElementOverview from '../../common/ElementOverview';
import gardenAreaPropStyle from '../../../propTypes/gardenArea';
import AddGardenAreaDialog from '../AddGardenAreaDialog';

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

const GardenAreasCollection = ({ data, onAreaSubmit, submitStatus }) => {
  // Element overview component takes this object
  console.log(submitStatus);
  const gardenAreasElement = () => ({
    id: 'areas-overview',
    name: 'Garden Area',
    collection: data,
    prompts: [{
      action: 'Add new area',
      desc: 'Add a representation of an area of your garden',
      // eslint-disable-next-line react/prop-types
      dialog: ({ submitHandler, statusData }) => (
        <AddGardenAreaDialog
          onAreaSubmit={submitHandler}
          submitStatus={statusData}
        />
      ),
      submitHandler: onAreaSubmit,
    }],
  });
  console.log(gardenAreasElement());
  return (
    <section id="garden-areas-collection">
      <h2>Garden areas Collection</h2>
      <ElementOverview
        element={gardenAreasElement()}
        renderCollection={renderCollection}
        actionFeedback={submitStatus}
        customDialog={AddGardenAreaDialog({ onAreaSubmit, submitStatus })}
      />
    </section>
  );
};

GardenAreasCollection.propTypes = {
  data: PropTypes.arrayOf(gardenAreaPropStyle),
  onAreaSubmit: PropTypes.func,
  submitStatus: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    submitError: PropTypes.string,
  }),
};

GardenAreasCollection.defaultProps = {
  data: [],
  onAreaSubmit: () => {},
  submitStatus: {
    isSubmitting: false,
    submitError: '',
  },
};

export default GardenAreasCollection;
