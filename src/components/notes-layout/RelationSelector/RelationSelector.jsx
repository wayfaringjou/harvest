import React from 'react';
import PropTypes from 'prop-types';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import useGardenContext from '../../../hooks/useGardenContext';
import { gardenAreasCollection, plantsCollection } from '../../../services/resources';

const RelationSelector = ({ type, onSelect, selection }) => {
  const { gardenData } = useGardenContext();
  let options;
  switch (type) {
    case 'Area':
      options = useAPIRetrieve(gardenAreasCollection(gardenData.current.id).getAll);
      break;
    case 'Plant':
      options = useAPIRetrieve(plantsCollection(gardenData.current.id).getAll);
      break;
    default: throw new Error('Invalid type');
  }

  if (options.isRetrieving) return <p>Loading Note</p>;

  if (options.isFailed) {
    return (
      <p>
        There was an error:
        {options.error.message}
      </p>
    );
  }

  return (
    <label htmlFor={`${type}-select`}>
      <p>{`${type}:`}</p>
      <select
        name={`${type}-select`}
        id={`${type}-select`}
        value={selection}
        onChange={({ target: { value } }) => onSelect(value)}
      >
        <option value="none">none</option>
        {options.data.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
};

RelationSelector.propTypes = {
  type: PropTypes.string,
  onSelect: PropTypes.func,
  selection: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

RelationSelector.defaultProps = {
  type: '',
  onSelect: () => {},
  selection: '',
};
export default RelationSelector;
