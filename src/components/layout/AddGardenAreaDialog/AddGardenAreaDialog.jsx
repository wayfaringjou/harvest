/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AddGardenAreaDialog = ({ onAreaSubmit, areaSubmitStatus, closeDialog }) => {
  const [newArea, setNewArea] = useState({
    name: '',
    length_cm: '',
    width_cm: '',
  });
  useEffect(() => () => {
    areaSubmitStatus.setSubmitSuccess(false);
  }, []);
  // eslint-disable-next-line react/prop-types
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
  }),
  closeDialog: PropTypes.func,
};

AddGardenAreaDialog.defaultProps = {
  onAreaSubmit: () => {},
  areaSubmitStatus: {
    isSubmitting: false,
    submitError: '',
  },
  closeDialog: () => {},
};

export default AddGardenAreaDialog;
