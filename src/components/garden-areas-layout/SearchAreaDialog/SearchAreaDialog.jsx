import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './SearchAreaDialog.css';

const SearchAreaDialog = ({ filter, filterHandler, closeDialog }) => {
  useEffect(() => () => filterHandler(''), []);
  return (
    <form className="add-garden flow-all">
      <label htmlFor="filter-areas">
        <p>Filter list of areas by name:</p>
        <input
          id="filter-areas"
          type="search"
          value={filter}
          onChange={({ target: { value } }) => filterHandler(value)}
        />
      </label>
      <section className="dialog-actions">
        <button
          type="button"
          className="text"
          onClick={() => {
            closeDialog();
          }}
        >
          Cancel
        </button>
      </section>

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
