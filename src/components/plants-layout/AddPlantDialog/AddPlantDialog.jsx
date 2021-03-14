/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import plantPropTypes from '../../../propTypes/plant';
import usePrevious from '../../../hooks/usePrevious';
import ApiAutocomplete from '../../common/ApiAutocomplete';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import { plantSingleton } from '../../../services/resources';
import useGardenContext from '../../../hooks/useGardenContext';

const AddPlantDialog = ({
  onPlantSubmit,
  plantSubmitStatus,
  closeDialog,
  plantData,
}) => {
  const [newPlant, setNewPlant] = useState(plantData);
  const [selectedPlant, setSelectedPlant] = useState('');

  const garden = useGardenContext().gardenData.current;
  const plant = plantSingleton(garden.id);

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  } = useAPIRetrieve(() => plant.getDataWithPath(selectedPlant), selectedPlant, (!selectedPlant));

  const lastStatus = usePrevious(plantSubmitStatus.isSubmitting);
  const lastSelected = usePrevious(setSelectedPlant);

  const serializeNewPlantData = (newPlantData) => {
    const growthData = {};
    const images = {};

    Object.keys(newPlantData.growth).forEach((key) => {
      if (newPlantData.growth[key]) {
        growthData[key] = newPlantData.growth[key];
      }
    });

    Object.keys(newPlantData.images).forEach((key) => {
      if (newPlantData.images[key]) {
        images[key] = newPlantData.images[key][0];
      }
    });

    return ({
      name: newPlantData.common_name,
      names: newPlantData.common_names.eng,
      scientific_name: newPlantData.scientific_name,
      growth: growthData || {},
      images: images || {},
    });
  };
  useEffect(() => {
    if (lastStatus === true && plantSubmitStatus.isSubmitting === false) {
      setTimeout(() => closeDialog(), 2000);
    }

    if (data) {
      setNewPlant({ ...newPlant, description: data.data.growth.description });
    }

    return () => () => plantSubmitStatus.setSubmitSuccess(false);
  }, [plantSubmitStatus.isSubmitting, isRetrieving]);

  if (plantSubmitStatus.submitSuccess) {
    return <p>Success</p>;
  }

  if (data) {
    console.log(serializeNewPlantData(data.data));
  }

  return (
    <form onSubmit={(e) => onPlantSubmit(e, newPlant)}>
      <button
        type="button"
        onClick={() => {
          closeDialog();
        }}
      >
        X
      </button>
      {plantSubmitStatus.submitError && <h4>There was an error</h4>}
      <label htmlFor="plant-name">
        <p>New plant name:</p>
        <input
          required
          id="plant-name"
          type="text"
          onChange={({ target: { value } }) => setNewPlant(
            { ...newPlant, name: value },
          )}
          value={newPlant.name}
          placeholder="'Tomato', 'Dill'"
        />
      </label>

      <label htmlFor="plant-description">
        <p>Description:</p>
        <textarea
          required
          id="plant-description"
          type="text"
          onChange={({ target: { value } }) => setNewPlant(
            { ...newPlant, description: value },
          )}
          value={newPlant.description}
          placeholder="'Description'"
        />
      </label>

      <ApiAutocomplete setSelected={setSelectedPlant} />
      <button
        type="submit"
        disabled={plantSubmitStatus.isSubmitting}
      >
        {plantSubmitStatus.isSubmitting ? 'Saving...' : 'Submit'}
      </button>
    </form>
  );
};

AddPlantDialog.propTypes = {
  onPlantSubmit: PropTypes.func,
  plantSubmitStatus: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    submitError: PropTypes.string,
    submitSuccess: PropTypes.bool,
    submitResponse: plantPropTypes,
    setSubmitSuccess: PropTypes.func,
    setSubmitError: PropTypes.func,
  }),
  closeDialog: PropTypes.func,
  plantData: plantPropTypes,
};
AddPlantDialog.defaultProps = {
  onPlantSubmit: () => {},
  plantSubmitStatus: {
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
    submitResponse: null,
    setSubmitSuccess: () => {},
    setSubmitError: () => {},
  },
  closeDialog: () => {},
  plantData: {
    id: '',
    name: '',
    garden_id: '',
    area_id: '',
  },
};
export default AddPlantDialog;
