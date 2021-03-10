/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { noteSingleton } from '../../../services/resources';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import useAPISend from '../../../hooks/useAPISend';
import usePrevious from '../../../hooks/usePrevious';
import useGardenContext from '../../../hooks/useGardenContext';
import RelationSelector from '../../notes-layout/RelationSelector';
import { fetchNotes } from '../../../services/fakeAPI';

const note = noteSingleton();

const NoteDetail = ({ match: { params: { noteId } } }) => {
  const [reload, setReload] = useState(false);
  const [request, setRequest] = useState(false);
  const [requestFunction, setRequestFunction] = useState(null);
  const [deleted, setDeleted] = useState(false);

  const garden = useGardenContext();

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  // } = useAPIRetrieve(() => note.getById(noteId), reload);
  } = useAPIRetrieve(() => fetchNotes({ note_id: noteId }), reload);

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

  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
    id: '',
    user_id: '',
    garden_id: '',
    area_id: '',
    plant_id: '',
  });
  const history = useHistory();

  const lastRetrieveStatus = usePrevious(isRetrieving);
  const lastRequest = usePrevious(request);
  const lastSubmitStatus = usePrevious(isSubmitting);

  const handleNoteRequest = async (e, reqData, reqType) => {
    e.preventDefault();
    // Create a new plant object with data from request
    const updateNote = noteSingleton(reqData);
    switch (reqType) {
      case 'POST':
        setRequestFunction({ request: updateNote.post });
        setRequest(!request);
        break;
      case 'PATCH':
        setRequestFunction({ request: updateNote.patch });
        setRequest(!request);
        break;
      case 'DELETE':
        setRequestFunction({ request: updateNote.delete });
        setDeleted(true);
        setRequest(!request);
        break;
      default:
        throw new Error('Invalid method');
    }
  };

  useEffect(() => {
    if (lastRetrieveStatus === true && isRetrieving === false && isFailed === false) {
      setNoteData({
        ...data,
        area_id: data.area_id || '',
        plant_id: data.plant_id || '',
      });
    }
    console.log(deleted);
    if (lastSubmitStatus === true && isSubmitting === false && deleted === true && submitSuccess) {
      history.push('/garden');
    }
  }, [isRetrieving, isSubmitting]);

  if (garden.isRetrieving) return <p>Loading garden data</p>;
  if (isRetrieving) return <p>Loading Note</p>;

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
      <form onSubmit={(e) => handleNoteRequest(e, noteData, 'PATCH')}>
        <button type="button" onClick={() => history.goBack()}>Back</button>
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
          <p>Select if note is related with a garden area:</p>
          <RelationSelector
            type="Area"
            onSelect={(value) => setNoteData({ ...noteData, area_id: value })}
            selection={noteData.area_id}
          />
          <p>Select if note is related with a plant:</p>
          <RelationSelector
            type="Plant"
            onSelect={(value) => setNoteData({ ...noteData, plant_id: value })}
            selection={noteData.plant_id}
          />
          <label htmlFor="note-content">
            <p>Note content:</p>
            <textarea
              type="text"
              value={noteData.content}
              onChange={({ target: { value } }) => setNoteData({ ...noteData, content: value })}
            />
          </label>
        </fieldset>
        <button type="submit">Save changes</button>
        <button
          type="button"
          onClick={(e) => handleNoteRequest(e, noteData, 'DELETE')}
        >
          Delete note
        </button>
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
