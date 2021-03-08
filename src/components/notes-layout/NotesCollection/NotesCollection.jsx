import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddNoteDialog from '../AddNoteDialog';
import notePropTypes from '../../../propTypes/note';
import usePrevious from '../../../hooks/usePrevious';
import { NOTES } from '../../../config/routes';

const NotesCollection = ({
  items,
  filterString,
  deleteControl,
  editControl,
  onNoteUpdate,
  onNoteDelete,
  noteSubmitStatus,
}) => {
  let itemsToRender = items;
  itemsToRender.sort((a, b) => a.id - b.id);

  if (items.length === 0) {
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
    <ul className="notes-list">
      {itemsToRender.map((item) => {
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
              <p>
                {item.title}
              </p>
              <p>Confirm delete:</p>
              {noteSubmitStatus.submitError && <p>There was an error</p>}
              <button
                type="button"
                disabled={noteSubmitStatus.isSubmitting}
                onClick={(e) => onNoteDelete(e, { id: item.id })}
              >
                Confirm
              </button>
              <button
                type="button"
                disabled={noteSubmitStatus.isSubmitting}
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
                {item.title}
              </p>
              <AddNoteDialog
                key={item.id}
                noteData={item}
                closeDialog={() => editControl.setIdToEdit('')}
                onNoteSubmit={onNoteUpdate}
                noteSubmitStatus={noteSubmitStatus}
              />
            </li>
          );
        }

        return (
          <li key={item.id}>
            <p>
              <Link to={`${NOTES}/${item.id}`}>
                {item.title}
              </Link>
            </p>
            <button
              type="button"
              onClick={() => {
                deleteControl.setIdToDelete(item.id);
                editControl.setIdToEdit('');
              }}
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                editControl.setIdToEdit(item.id);
                deleteControl.setIdToDelete('');
              }}
            >
              Edit
            </button>
          </li>
        );
      })}
    </ul>
  );
};

NotesCollection.propTypes = {
  items: PropTypes.arrayOf(notePropTypes),
  filterString: PropTypes.string,
  deleteControl: PropTypes.shape({
    setIdToDelete: PropTypes.func,
    idToDelete: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onNoteDelete: PropTypes.func,
  editControl: PropTypes.shape({
    setIdToEdit: PropTypes.func,
    idToEdit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onNoteUpdate: PropTypes.func,
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
  filterString: '',
  editControl: {
    setIdToEdit: () => {},
    idToEdit: '',
  },
  onNoteUpdate: () => {},
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
