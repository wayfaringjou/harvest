import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import plantPropTypes from '../../../propTypes/plant';
import usePrevious from '../../../hooks/usePrevious';

const AddPlantDialog = ({
  onPlantSubmit,
  plantSubmitStatus,
  closeDialog,
  plantData,
}) => {
  const [newPlant, setNewPlant] = useState(plantData);

  const lastStatus = usePrevious(plantSubmitStatus.isSubmitting);

  useEffect(() => {
    if (lastStatus === true && plantSubmitStatus.isSubmitting === false) {
      setTimeout(() => closeDialog(), 2000);
    }
    return () => () => plantSubmitStatus.setSubmitSuccess(false);
  }, [plantSubmitStatus.isSubmitting]);

  if (plantSubmitStatus.submitSuccess) {
    return <p>Success</p>;
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
  },
};
export default AddPlantDialog;
