/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { plantsCollection } from '../../../services/resources';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import { fetchPlants } from '../../../services/fakeAPI';

const PlantsListSimple = ({ garden_id, area_id }) => {
  const plants = plantsCollection(garden_id);

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  // } = useAPIRetrieve(() => plants.getWithQuery(`area_id=${area_id}`));
  } = useAPIRetrieve(() => fetchPlants({ area_id }));

  if (isRetrieving) return <p>Loading</p>;

  if (isFailed) {
    return (
      <p>
        There was an error:
        {error.message}
      </p>
    );
  }

  return (
    <section className="planted-list">
      <h5>Planted here:</h5>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

PlantsListSimple.propTypes = {
  garden_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  area_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

PlantsListSimple.defaultProps = {
  garden_id: '',
  area_id: '',
};
export default PlantsListSimple;
