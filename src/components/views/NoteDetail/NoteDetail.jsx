/* eslint-disable no-unused-vars */
import React, { useState, useEfect, useEffect } from 'react';
import PropTypes from 'prop-types';
import { noteSingleton } from '../../../services/resources';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import useAPISend from '../../../hooks/useAPISend';
import usePrevious from '../../../hooks/usePrevious';

const note = noteSingleton();
const NoteDetail = ({ match: { params: { noteId } } }) => {
  const [reload, setReload] = useState(false);
  const [request, setRequest] = useState(false);
  const [requestFunction, setRequestFunction] = useState(null);

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  } = useAPIRetrieve(() => note.getById(noteId), reload);

  const {
    requestState,
    setRequestState,
  } = useAPISend(requestFunction, request, { reload, setReload });

  const {
    isSubmitting,
    submitSuccess,
    submitError,
    submitResponse,
  } = requestState;

  const [noteData, setNoteData] = useState(null);

  const lastRetrieveStatus = usePrevious(isRetrieving);

  useEffect(() => {
    if (lastRetrieveStatus === true && isRetrieving === false && isFailed === false) {
      setNoteData(data);
    }
  }, [isRetrieving, isSubmitting]);

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
    <article className="note">
      <form>
        <fieldset>
          <legend>
            <h2>
              Note
            </h2>
          </legend>
          <label htmlFor="note-title">
            <p>Note title:</p>
            <input
              type="text"
              value={noteData.title}
              onChange={({ target: { value } }) => setNoteData({ ...noteData, title: value })}
            />
          </label>
          <label htmlFor="note-content">
            <p>Note content:</p>
            <textarea
              type="text"
              value={noteData.content}
              onChange={({ target: { value } }) => setNoteData({ ...noteData, content: value })}
            />
          </label>
        </fieldset>
      </form>
    </article>
  );
};

NoteDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
};

NoteDetail.defaultProps = {
  match: {},
};
export default NoteDetail;
