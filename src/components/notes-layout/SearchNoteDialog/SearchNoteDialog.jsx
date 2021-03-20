import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchNoteDialog = ({ filter, filterHandler, closeDialog }) => {
  useEffect(() => () => filterHandler(''), []);
  return (
    <form>

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

SearchNoteDialog.propTypes = {
  filter: PropTypes.string,
  filterHandler: PropTypes.func,
  closeDialog: PropTypes.func,
};

SearchNoteDialog.defaultProps = {
  filter: '',
  filterHandler: () => {},
  closeDialog: () => {},
};
export default SearchNoteDialog;
