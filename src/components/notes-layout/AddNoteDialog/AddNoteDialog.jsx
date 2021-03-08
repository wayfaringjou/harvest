import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import notePropTypes from '../../../propTypes/plant';
import usePrevious from '../../../hooks/usePrevious';

const AddNoteDialog = ({
  onNoteSubmit,
  noteSubmitStatus,
  closeDialog,
  noteData,
}) => {
  const [newNote, setNewNote] = useState(noteData);

  const lastStatus = usePrevious(noteSubmitStatus.isSubmitting);

  useEffect(() => {
    if (lastStatus === true && noteSubmitStatus.isSubmitting === false) {
      setTimeout(() => closeDialog(), 2000);
    }
    return () => () => noteSubmitStatus.setSubmitSuccess(false);
  }, [noteSubmitStatus.isSubmitting]);

  if (noteSubmitStatus.submitSuccess) {
    return <p>Success</p>;
  }

  return (
    <form onSubmit={(e) => onNoteSubmit(e, newNote)}>
      <button
        type="button"
        onClick={() => {
          closeDialog();
        }}
      >
        X
      </button>
      {noteSubmitStatus.submitError && <h4>There was an error</h4>}
      <label htmlFor="note-title">
        <p>New note title:</p>
        <input
          required
          id="note-title"
          type="text"
          onChange={({ target: { value } }) => setNewNote(
            { ...newNote, title: value },
          )}
          value={newNote.title}
          placeholder="'Chores', 'Soil description'"
        />
      </label>

      <button
        type="submit"
        disabled={noteSubmitStatus.isSubmitting}
      >
        {noteSubmitStatus.isSubmitting ? 'Saving...' : 'Submit'}
      </button>
    </form>
  );
};

AddNoteDialog.propTypes = {
  onNoteSubmit: PropTypes.func,
  noteSubmitStatus: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    submitError: PropTypes.string,
    submitSuccess: PropTypes.bool,
    submitResponse: notePropTypes,
    setSubmitSuccess: PropTypes.func,
    setSubmitError: PropTypes.func,
  }),
  closeDialog: PropTypes.func,
  noteData: notePropTypes,
};
AddNoteDialog.defaultProps = {
  onNoteSubmit: () => {},
  noteSubmitStatus: {
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
    submitResponse: null,
    setSubmitSuccess: () => {},
    setSubmitError: () => {},
  },
  closeDialog: () => {},
  noteData: {
    id: '',
    name: '',
  },
};
export default AddNoteDialog;
