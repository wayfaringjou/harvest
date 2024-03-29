import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import notePropTypes from '../../../propTypes/note';
import usePrevious from '../../../hooks/usePrevious';
import { NOTES } from '../../../config/routes';
import './NotesCollection.css';

const NotesCollection = ({
  items,
  isRetrieving,
  filterString,
  deleteControl,
  onNoteDelete,
  noteSubmitStatus,
}) => {
  let itemsToRender = [];
  if (!isRetrieving) {
    itemsToRender = items;

    if (itemsToRender) {
      itemsToRender.sort((a, b) => a.id - b.id);
    }

    if (items && items.length === 0) {
      return (
        <p>
          No notes added yet.
        </p>
      );
    }
    if (filterString) {
      itemsToRender = itemsToRender
        .filter((i) => i.title.toLowerCase().includes(filterString.toLowerCase()));
      if (itemsToRender.length === 0) {
        return (
          <p>
            No matches.
          </p>
        );
      }
    }
  }
  const lastStatus = usePrevious(noteSubmitStatus.isSubmitting);

  useEffect(() => {
    if (lastStatus === true && noteSubmitStatus.isSubmitting === false) {
      if (noteSubmitStatus.submitSuccess) {
        setTimeout(() => noteSubmitStatus.setSubmitSuccess(false), 2000);
      } else if (noteSubmitStatus.submitError) {
        setTimeout(() => noteSubmitStatus.setSubmitError(''), 2000);
      }
    }
  }, [noteSubmitStatus.isSubmitting]);

  return (
    <section className="notes-collection">
      <h3>Your Notes:</h3>
      <ul className="notes-list">
        {itemsToRender && itemsToRender.map((item) => {
          if (item.id === deleteControl.idToDelete) {
            if (noteSubmitStatus.submitSuccess) {
              return (
                <p key={item.id}>
                  {`${noteSubmitStatus.submitResponse.title} Deleted`}
                </p>
              );
            }

            return (
              <li key={item.id}>
                <h4>
                  {item.title}
                </h4>
                <p>Confirm delete:</p>
                {noteSubmitStatus.submitError && <p>There was an error</p>}
                <button
                  type="button"
                  disabled={noteSubmitStatus.isSubmitting}
                  onClick={(e) => onNoteDelete(e, { id: item.id })}
                >
                  <span className="btn-label">
                    Confirm
                  </span>
                </button>
                <button
                  type="button"
                  className="text"
                  disabled={noteSubmitStatus.isSubmitting}
                  onClick={() => deleteControl.setIdToDelete('')}
                >
                  <span className="btn-label">
                    Cancel
                  </span>
                </button>
              </li>
            );
          }

          return (
            <li key={item.id}>
              <h4>
                <Link to={`${NOTES}/${item.id}`}>
                  {item.title}
                </Link>
              </h4>
              <section className="note-actions">
                <button
                  type="button"
                  onClick={() => {
                    deleteControl.setIdToDelete(item.id);
                  }}
                >
                  Delete
                </button>
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

NotesCollection.propTypes = {
  items: PropTypes.arrayOf(notePropTypes),
  isRetrieving: PropTypes.bool,
  filterString: PropTypes.string,
  deleteControl: PropTypes.shape({
    setIdToDelete: PropTypes.func,
    idToDelete: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onNoteDelete: PropTypes.func,
  noteSubmitStatus: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    submitError: PropTypes.string,
    submitSuccess: PropTypes.bool,
    setSubmitSuccess: PropTypes.func,
    setSubmitError: PropTypes.func,
    submitResponse: notePropTypes,
  }),
};

NotesCollection.defaultProps = {
  items: [],
  isRetrieving: false,
  filterString: '',
  deleteControl: {
    setIdToDelete: () => {},
    idToDelete: '',
  },
  onNoteDelete: () => {},
  noteSubmitStatus: {
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
    submitResponse: null,
    setSubmitSuccess: () => {},
    setSubmitError: () => {},
  },
};

export default NotesCollection;
