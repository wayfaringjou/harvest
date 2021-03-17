import React, { useState } from 'react';
import NotesOverview from '../../notes-layout/NotesOverview';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import useAPISend from '../../../hooks/useAPISend';
import { notesCollection, noteSingleton } from '../../../services/resources';
import useAuthContext from '../../../hooks/useAuthContext';
import config from '../../../config/api';

const Notes = () => {
  const [reload, setReload] = useState(false);
  const [request, setRequest] = useState(false);
  const [requestFunction, setRequestFunction] = useState(null);

  const { logedUser } = useAuthContext();

  let notes = notesCollection();

  if (logedUser) {
    notes = notesCollection({
      path: `${config.API_BASEPATH}/users/${logedUser.user_id}/garden/notes`,
    });
  }
  const {
    data,
    isRetrieving,
    isFailed,
    error,
  } = useAPIRetrieve(notes.getAll, logedUser, !logedUser);

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

  // if (isRetrieving) return <p>Loading</p>;

  if (isFailed) {
    return (
      <p>
        There was an error:
        {error.message}
      </p>
    );
  }

  const handleNoteRequest = async (e, reqData, reqType) => {
    e.preventDefault();
    // Create a new area object with data from request
    const note = noteSingleton(reqData);
    switch (reqType) {
      case 'POST':
        setRequestFunction({ request: note.post });
        setRequest(!request);
        break;
      case 'PATCH':
        setRequestFunction({ request: note.patch });
        setRequest(!request);
        break;
      case 'DELETE':
        setRequestFunction({ request: note.delete });
        setRequest(!request);
        break;
      default:
        throw new Error('Invalid method');
    }
  };

  return (
    <>
      <NotesOverview
        data={data}
        isRetrieving={isRetrieving}
        onNotePost={(e, newPlant) => {
          handleNoteRequest(e, newPlant, 'POST');
        }}
        onNoteUpdate={(e, updatePlant) => {
          handleNoteRequest(e, updatePlant, 'PATCH');
        }}
        onNoteDelete={(e, idToDelete) => {
          handleNoteRequest(e, idToDelete, 'DELETE');
        }}
        noteSubmitStatus={{
          isSubmitting,
          submitError,
          submitSuccess,
          submitResponse,
          setSubmitSuccess: (value) => setRequestState(
            { ...requestState, submitSuccess: value },
          ),
          setSubmitError: (value) => setRequestState(
            { ...requestState, submitError: value },
          ),
        }}
      />
    </>
  );
};

export default Notes;
