import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddGardenAreaDialog from '../AddGardenAreaDialog';
import areaPropTypes from '../../../propTypes/gardenArea';
import usePrevious from '../../../hooks/usePrevious';

const GardenAreasCollection = ({
  items,
  filterString,
  deleteControl,
  editControl,
  onAreaUpdate,
  onAreaDelete,
  areaSubmitStatus,
}) => {
  let itemsToRender = items;

  if (items.length === 0) {
    return (
      <p>
        No garden areas added yet.
      </p>
    );
  }
  if (filterString) {
    itemsToRender = itemsToRender
      .filter((i) => i.name.toLowerCase().includes(filterString.toLowerCase()));
    if (itemsToRender.length === 0) {
      return (
        <p>
          No matches.
        </p>
      );
    }
  }
  const lastStatus = usePrevious(areaSubmitStatus.isSubmitting);

  useEffect(() => {
    if (lastStatus === true && areaSubmitStatus.isSubmitting === false) {
      if (areaSubmitStatus.submitSuccess) {
        setTimeout(() => areaSubmitStatus.setSubmitSuccess(false), 2000);
      } else if (areaSubmitStatus.submitError) {
        setTimeout(() => areaSubmitStatus.setSubmitError(''), 2000);
      }
    }
  }, [areaSubmitStatus.isSubmitting]);

  return (
    <ul className="garden-areas-list">
      {itemsToRender.map((item) => {
        if (item.id === deleteControl.idToDelete) {
          if (areaSubmitStatus.submitSuccess) {
            return (
              <p key={item.id}>
                {`${areaSubmitStatus.submitResponse.name} Deleted`}
              </p>
            );
          }

          return (
            <li key={item.id}>
              <p>
                {item.name}
              </p>
              <p>Confirm delete:</p>
              {areaSubmitStatus.submitError && <p>There was an error</p>}
              <button
                type="button"
                disabled={areaSubmitStatus.isSubmitting}
                onClick={(e) => onAreaDelete(e, { id: item.id })}
              >
                Confirm
              </button>
              <button
                type="button"
                disabled={areaSubmitStatus.isSubmitting}
                onClick={() => deleteControl.setIdToDelete('')}
              >
                Cancel
              </button>
            </li>
          );
        }

        if (item.id === editControl.idToEdit) {
          return (
            <li key={item.id}>
              <p>Edit info:</p>
              <p>
                {item.name}
              </p>
              <AddGardenAreaDialog
                areaData={item}
                closeDialog={() => editControl.setIdToEdit('')}
                onAreaSubmit={onAreaUpdate}
                areaSubmitStatus={areaSubmitStatus}
              />
            </li>
          );
        }

        return (
          <li key={item.id}>
            <p>
              <Link to={`/garden/areas/${item.id}`}>
                {item.name}
              </Link>
            </p>
            <p>
              {item.length_cm && `Lenght: ${item.length_cm}cm`}
            </p>
            <p>
              {item.width_cm && `Width: ${item.width_cm}cm`}
            </p>
            <button
              type="button"
              onClick={() => {
                deleteControl.setIdToDelete(item.id);
                editControl.setIdToEdit('');
              }}
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                editControl.setIdToEdit(item.id);
                deleteControl.setIdToDelete('');
              }}
            >
              Edit
            </button>
          </li>
        );
      })}
    </ul>
  );
};

GardenAreasCollection.propTypes = {
  items: PropTypes.arrayOf(areaPropTypes),
  filterString: PropTypes.string,
  deleteControl: PropTypes.shape({
    setIdToDelete: PropTypes.func,
    idToDelete: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onAreaDelete: PropTypes.func,
  editControl: PropTypes.shape({
    setIdToEdit: PropTypes.func,
    idToEdit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onAreaUpdate: PropTypes.func,
  areaSubmitStatus: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    submitError: PropTypes.string,
    submitSuccess: PropTypes.bool,
    submitResponse: areaPropTypes,
    setSubmitSuccess: PropTypes.func,
    setSubmitError: PropTypes.func,
  }),
};

GardenAreasCollection.defaultProps = {
  items: [],
  filterString: '',
  editControl: {
    setIdToEdit: () => {},
    idToEdit: '',
  },
  onAreaUpdate: () => {},
  deleteControl: {
    setIdToDelete: () => {},
    idToDelete: '',
  },
  onAreaDelete: () => {},
  areaSubmitStatus: {
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
    submitResponse: null,
    setSubmitSuccess: () => {},
    setSubmitError: () => {},
  },
};

export default GardenAreasCollection;
