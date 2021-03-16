import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import areaPropTypes from '../../../propTypes/gardenArea';
import useGardenContext from '../../../hooks/useGardenContext';

// onAreaSubmit can be used for POST or PATCH methods
const AddGardenAreaDialog = ({
  onAreaSubmit,
  areaSubmitStatus,
  closeDialog,
  areaData,
}) => {
  const garden = useGardenContext().gardenData.current;

  const [newArea, setNewArea] = useState({ ...areaData, garden_id: garden.id });

  useEffect(() => () => {
    areaSubmitStatus.setSubmitSuccess(false);
  }, []);

  if (areaSubmitStatus.submitSuccess) {
    setTimeout(() => closeDialog(), 2000);
    return <p>Success</p>;
  }

  return (
    <form onSubmit={(e) => onAreaSubmit(e, newArea)}>
      <button
        type="button"
        onClick={() => {
          closeDialog();
        }}
      >
        X
      </button>
      {areaSubmitStatus.submitError && <h4>There was an error</h4>}
      <label htmlFor="area-name">
        <p>New area name:</p>
        <input
          required
          id="area-name"
          type="text"
          onChange={({ target: { value } }) => setNewArea(
            { ...newArea, name: value },
          )}
          value={newArea.name}
          placeholder="'Raised bed', 'Backyard'"
        />
      </label>
      <label htmlFor="area-name">
        <p>New area length in cm:</p>
        <input
          id="area-length"
          type="number"
          value={newArea.length_cm}
          onChange={({ target: { value } }) => setNewArea(
            { ...newArea, length_cm: value },
          )}
          placeholder="125"
        />
      </label>
      <label htmlFor="area-width">
        <p>New area width in cm:</p>
        <input
          id="area-width"
          type="number"
          value={newArea.width_cm}
          onChange={({ target: { value } }) => setNewArea(
            { ...newArea, width_cm: value },
          )}
          placeholder="125"
        />
      </label>
      <button
        type="submit"
        disabled={areaSubmitStatus.isSubmitting}
      >
        {areaSubmitStatus.isSubmitting ? 'Saving...' : 'Submit'}
      </button>
    </form>
  );
};

AddGardenAreaDialog.propTypes = {
  onAreaSubmit: PropTypes.func,
  areaSubmitStatus: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    submitError: PropTypes.string,
    submitSuccess: PropTypes.bool,
    submitResponse: areaPropTypes,
    setSubmitSuccess: PropTypes.func,
    setSubmitError: PropTypes.func,
  }),
  closeDialog: PropTypes.func,
  areaData: areaPropTypes,
};

AddGardenAreaDialog.defaultProps = {
  onAreaSubmit: () => {},
  areaSubmitStatus: {
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
    submitResponse: null,
    setSubmitSuccess: () => {},
    setSubmitError: () => {},
  },
  closeDialog: () => {},
  areaData: {
    id: '',
    name: '',
    garden_id: '',
    length_cm: '',
    width_cm: '',
  },
};

export default AddGardenAreaDialog;
