import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchAreaDialog = ({ filter, filterHandler, closeDialog }) => {
  useEffect(() => () => filterHandler(''), []);
  return (
    <form>
      <button
        type="button"
        onClick={() => {
          closeDialog();
        }}
      >
        X
      </button>
      <label htmlFor="filter-areas">
        <p>Filter list of areas by name:</p>
        <input
          id="filter-areas"
          type="search"
          value={filter}
          onChange={({ target: { value } }) => filterHandler(value)}
        />
      </label>
    </form>
  );
};

SearchAreaDialog.propTypes = {
  filter: PropTypes.string,
  filterHandler: PropTypes.func,
  closeDialog: PropTypes.func,
};

SearchAreaDialog.defaultProps = {
  filter: '',
  filterHandler: () => {},
  closeDialog: () => {},
};

export default SearchAreaDialog;
