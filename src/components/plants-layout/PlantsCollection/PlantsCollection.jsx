import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddPlantDialog from '../AddPlantDialog';
import plantPropTypes from '../../../propTypes/plant';
import usePrevious from '../../../hooks/usePrevious';
import { PLANTS } from '../../../config/routes';
import AreaFlair from '../AreaFlair';
import './PlantsCollection.css';

const PlantsCollection = ({
  items,
  isRetrieving,
  garden_id,
  filterString,
  deleteControl,
  editControl,
  onPlantUpdate,
  onPlantDelete,
  plantSubmitStatus,
}) => {
  let itemsToRender = [];
  if (!isRetrieving) {
    itemsToRender = items;
    itemsToRender.sort((a, b) => a.id - b.id);

    if (items.length === 0) {
      return (
        <p>
          No plants added yet.
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
  const lastStatus = usePrevious(plantSubmitStatus.isSubmitting);

  useEffect(() => {
    if (lastStatus === true && plantSubmitStatus.isSubmitting === false) {
      if (plantSubmitStatus.submitSuccess) {
        setTimeout(() => plantSubmitStatus.setSubmitSuccess(false), 2000);
      } else if (plantSubmitStatus.submitError) {
        setTimeout(() => plantSubmitStatus.setSubmitError(''), 2000);
      }
    }
  }, [plantSubmitStatus.isSubmitting]);

  return (
    <section className="plants-collection">
      <h3>Your plants:</h3>
      <ul className="plants-list">
        {itemsToRender.map((item) => {
          if (item.id === deleteControl.idToDelete) {
            if (plantSubmitStatus.submitSuccess) {
              return (
                <p key={item.id}>
                  {`${plantSubmitStatus.submitResponse.name} Deleted`}
                </p>
              );
            }

            return (
              <li key={item.id}>
                <h4>
                  {item.name}
                </h4>
                <p>Confirm delete:</p>
                {plantSubmitStatus.submitError && <p>There was an error</p>}
                <button
                  type="button"
                  disabled={plantSubmitStatus.isSubmitting}
                  onClick={(e) => onPlantDelete(e, { id: item.id })}
                >
                  <span className="btn-label">
                    Confirm
                  </span>
                </button>
                <button
                  className="text"
                  type="button"
                  disabled={plantSubmitStatus.isSubmitting}
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
                <AddPlantDialog
                  key={item.id}
                  plantData={item}
                  closeDialog={() => editControl.setIdToEdit('')}
                  onPlantSubmit={onPlantUpdate}
                  plantSubmitStatus={plantSubmitStatus}
                />
              </li>
            );
          }

          return (
            <li key={item.id}>
              <h4>
                <Link to={`${PLANTS}/${item.id}`}>
                  {item.name}
                </Link>
              </h4>
              {item.area_id && (
                <section className="plant-info">
                  <p>Planted in:</p>
                  <AreaFlair garden_id={garden_id} area_id={item.area_id} />
                </section>
              )}
              <section className="plant-actions">
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

PlantsCollection.propTypes = {
  items: PropTypes.arrayOf(plantPropTypes),
  isRetrieving: PropTypes.bool,
  garden_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  filterString: PropTypes.string,
  deleteControl: PropTypes.shape({
    setIdToDelete: PropTypes.func,
    idToDelete: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onPlantDelete: PropTypes.func,
  editControl: PropTypes.shape({
    setIdToEdit: PropTypes.func,
    idToEdit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onPlantUpdate: PropTypes.func,
  plantSubmitStatus: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    submitError: PropTypes.string,
    submitSuccess: PropTypes.bool,
    setSubmitSuccess: PropTypes.func,
    setSubmitError: PropTypes.func,
    submitResponse: plantPropTypes,
  }),
};

PlantsCollection.defaultProps = {
  items: [],
  isRetrieving: false,
  garden_id: '',
  filterString: '',
  editControl: {
    setIdToEdit: () => {},
    idToEdit: '',
  },
  onPlantUpdate: () => {},
  deleteControl: {
    setIdToDelete: () => {},
    idToDelete: '',
  },
  onPlantDelete: () => {},
  plantSubmitStatus: {
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
    submitResponse: null,
    setSubmitSuccess: () => {},
    setSubmitError: () => {},
  },
};

export default PlantsCollection;
