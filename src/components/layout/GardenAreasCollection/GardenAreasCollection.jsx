/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const GardenAreasCollection = ({
  items,
  filterString,
  deleteControl,
  editControl,
}) => {
  let itemsToRender = items;

  if (filterString) {
    itemsToRender = itemsToRender
      .filter((i) => i.name.toLowerCase().includes(filterString.toLowerCase()));
  }

  return (
    <ul className="garden-areas-list">
      {itemsToRender.map((item) => {
        if (item.id === deleteControl.idToDelete) {
          return (
            <li key={item.id}>
              <p>
                {item.name}
              </p>
              <p>Confirm delete:</p>
              <button type="button">Confirm</button>
              <button
                type="button"
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
              <button type="button">Confirm</button>
              <button
                type="button"
                onClick={() => editControl.setIdToEdit('')}
              >
                Cancel
              </button>
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
              onClick={() => deleteControl.setIdToDelete(item.id)}
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => editControl.setIdToEdit(item.id)}
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
  items: PropTypes.arrayOf(PropTypes.object),
  filterString: PropTypes.string,
};

GardenAreasCollection.defaultProps = {
  items: [],
  filterString: '',
};

export default GardenAreasCollection;
