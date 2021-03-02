import React from 'react';
import PropTypes from 'prop-types';
import ElementOverview from '../../common/ElementOverview';
import gardenAreaPropStyle from '../../../propTypes/gardenArea';
// import AddGardenAreaDialog from '../AddGardenAreaDialog';
import GardenAreasPrompts from '../GardenAreasPrompts';
import useModal from '../../../hooks/useModal';

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

const GardenAreasCollection = ({ data, onAreaSubmit, areaSubmitStatus }) => {
  // Element overview component takes this object
  console.log(areaSubmitStatus);
  const gardenAreasElement = () => ({
    id: 'areas-overview',
    name: 'Garden Area',
    collection: data,
  });
  console.log(gardenAreasElement());

  const {
    isModalOpen,
    modalContent,
    setModalContent,
    toggleModal,
  } = useModal();

  return (
    <section id="garden-areas-collection">
      <h2>Garden areas Collection</h2>
      <ElementOverview
        element={gardenAreasElement()}
        renderCollection={renderCollection}
        elementPrompts={GardenAreasPrompts({
          onAreaSubmit,
          areaSubmitStatus,
          toggleModal,
          setModalContent,
        })}
        modalState={{ isModalOpen, modalContent }}
        toggleModal={toggleModal}
      />
    </section>
  );
};

GardenAreasCollection.propTypes = {
  data: PropTypes.arrayOf(gardenAreaPropStyle),
  onAreaSubmit: PropTypes.func,
  areaSubmitStatus: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    submitError: PropTypes.string,
  }),
};

GardenAreasCollection.defaultProps = {
  data: [],
  onAreaSubmit: () => {},
  areaSubmitStatus: {
    isSubmitting: false,
    submitError: '',
  },
};

export default GardenAreasCollection;
