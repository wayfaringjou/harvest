import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plantsCollection } from '../../../services/resources';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';

const AreaPlantsCollection = ({ garden_id, area_id }) => {
  const plants = plantsCollection(garden_id);

  const [filterString, setFilterString] = useState('');

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  } = useAPIRetrieve(() => plants.getWithQuery(`area_id=${area_id}`));

  if (isRetrieving) return <p>Loading</p>;

  if (isFailed) {
    return (
      <p>
        There was an error:
        {error.message}
      </p>
    );
  }

  if (data.length === 0) {
    return (
      <p>
        No plants added yet.
      </p>
    );
  }

  let itemsToRender = data;
  itemsToRender.sort((a, b) => a.id - b.id);

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

  return (
    <section className="area-plants-collection">
      <h3>Plants in this area:</h3>
      <form>
        <label htmlFor="filter-list">
          <p>Filter by name:</p>
          <input
            type="search"
            onChange={({ target: { value } }) => setFilterString(value)}
          />
        </label>
      </form>
      <ul>
        {itemsToRender.map((item) => (
          <li key={item.id}>
            <h4>{item.name}</h4>
          </li>
        ))}
      </ul>
    </section>
  );
};

AreaPlantsCollection.propTypes = {
  garden_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  area_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

AreaPlantsCollection.defaultProps = {
  garden_id: '',
  area_id: '',
};

export default AreaPlantsCollection;
