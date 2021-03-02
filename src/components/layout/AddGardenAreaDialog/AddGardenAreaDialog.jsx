import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddGardenAreaDialog = ({ onAreaSubmit, submitStatus }) => {
  const [newArea, setNewArea] = useState({
    name: '',
    length_cm: '',
    width_cm: '',
  });
  // eslint-disable-next-line no-unused-vars
  const [test, setTest] = useState(submitStatus);

  console.log(submitStatus);
  return (
    <form onSubmit={(e) => onAreaSubmit(e, newArea)}>
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
      <input
        id="area-width"
        type="number"
        value={newArea.width_cm}
        onChange={({ target: { value } }) => setNewArea(
          { ...newArea, width_cm: value },
        )}
        placeholder="125"
      />
      <button
        type="submit"
      >
        {submitStatus.isSubmitting ? 'Saving...' : 'Submit'}
      </button>
    </form>
  );
};

AddGardenAreaDialog.propTypes = {
  onAreaSubmit: PropTypes.func,
  submitStatus: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    submitError: PropTypes.string,
  }),
};

AddGardenAreaDialog.defaultProps = {
  onAreaSubmit: () => {},
  submitStatus: {
    isSubmitting: false,
    submitError: '',
  },
};

export default AddGardenAreaDialog;
