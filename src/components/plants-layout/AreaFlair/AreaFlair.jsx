/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { gardenAreaSingleton } from '../../../services/resources';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import { fetchGardenAreas } from '../../../services/fakeAPI';

const AreaFlair = ({ garden_id, area_id }) => {
  const area = gardenAreaSingleton(garden_id);

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  // } = useAPIRetrieve(() => area.getById(area_id));
  } = useAPIRetrieve(() => fetchGardenAreas({ area_id }));

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
    <span className="planted-on-flair">
      <small>
        {data.name}
      </small>
    </span>
  );
};

AreaFlair.propTypes = {
  garden_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  area_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

AreaFlair.defaultProps = {
  garden_id: '',
  area_id: '',
};
export default AreaFlair;
