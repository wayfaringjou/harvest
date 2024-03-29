import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddGardenAreaDialog from '../AddGardenAreaDialog';
import areaPropTypes from '../../../propTypes/gardenArea';
import usePrevious from '../../../hooks/usePrevious';
import PlantsListSimple from '../PlantsListSimple/PlantsListSimple';
import './GardenAreasCollection.css';

const GardenAreasCollection = ({
  items,
  isRetrieving,
  garden_id,
  filterString,
  deleteControl,
  editControl,
  onAreaUpdate,
  onAreaDelete,
  areaSubmitStatus,
}) => {
  let itemsToRender = [];

  if (!isRetrieving) {
    itemsToRender = items;
    itemsToRender.sort((a, b) => a.id - b.id);

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
    <section className="areas-collection">
      <h3>Your Areas:</h3>
      <ul className="garden-areas-list">
        {itemsToRender.map((item) => {
          if (item.id === deleteControl.idToDelete) {
            if (areaSubmitStatus.submitSuccess) {
              return (
                <p className="submit-response" key={item.id}>
                  {`${areaSubmitStatus.submitResponse.name} Deleted`}
                </p>
              );
            }

            return (
              <li key={item.id}>
                <h4>
                  {item.name}
                </h4>
                <p>Confirm delete:</p>
                {areaSubmitStatus.submitError && <p>There was an error</p>}
                <button
                  className="text"
                  type="button"
                  disabled={areaSubmitStatus.isSubmitting}
                  onClick={(e) => onAreaDelete(e, { id: item.id })}
                >
                  <span className="btn-label">
                    Confirm
                  </span>
                </button>
                <button
                  type="button"
                  disabled={areaSubmitStatus.isSubmitting}
                  onClick={() => deleteControl.setIdToDelete('')}
                >
                  <span className="btn-label">
                    Cancel
                  </span>
                </button>
              </li>
            );
          }

          if (item.id === editControl.idToEdit) {
            return (
              <li key={item.id}>
                <p>Edit info:</p>
                <h4>
                  {item.name}
                </h4>
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
              <h4>
                <Link to={`/garden/areas/${item.id}`}>
                  {item.name}
                </Link>
              </h4>

              <section className="area-info">
                <p>
                  {item.length_cm && `Length: ${item.length_cm}cm`}
                </p>
                <p>
                  {item.width_cm && `Width: ${item.width_cm}cm`}
                </p>
              </section>

              <PlantsListSimple area_id={item.id} garden_id={garden_id} />
              <section className="area-actions">
                <button
                  type="button"
                  onClick={() => {
                    editControl.setIdToEdit(item.id);
                    deleteControl.setIdToDelete('');
                  }}
                >
                  <span className="btn-label">
                    Edit
                  </span>
                </button>
                <button
                  type="button"
                  className="text"
                  onClick={() => {
                    deleteControl.setIdToDelete(item.id);
                    editControl.setIdToEdit('');
                  }}
                >
                  <span className="btn-label">
                    Delete
                  </span>
                </button>
              </section>

            </li>
          );
        })}
      </ul>
    </section>
  );
};

GardenAreasCollection.propTypes = {
  items: PropTypes.arrayOf(areaPropTypes),
  isRetrieving: PropTypes.bool,
  garden_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  isRetrieving: false,
  garden_id: '',
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
