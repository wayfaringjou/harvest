import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ElementOverview from '../../common/ElementOverview';
import useDialog from '../../../hooks/useDialog';
import NotesCollection from '../NotesCollection';
import AddNoteDialog from '../AddNoteDialog';
import SearchNoteDialog from '../SearchNoteDialog';
import notePropTypes from '../../../propTypes/note';
import submitStatusPropTypes from '../../../propTypes/submitStatus';

const NotesOverview = ({
  data,
  onNotePost,
  noteSubmitStatus,
  onNoteUpdate,
  onNoteDelete,
}) => {
  const [collectionFilter, setCollectionFilter] = useState('');
  const [idToDelete, setIdToDelete] = useState('');
  const [idToEdit, setIdToEdit] = useState('');

  const {
    isDialogOpen,
    toggleDialog,
    openDialog,
    closeDialog,
  } = useDialog();

  const notesElement = () => ({
    id: 'notess-overview',
    name: 'Notes',
    // collection: data,
    prompts: {
      addNote: {
        id: 1,
        action: 'Add new note',
        desc: 'Add a note for your garden, area or plant',
        dialogComponent: AddNoteDialog,
        dialogProps: {
          onNoteSubmit: onNotePost,
          noteSubmitStatus,
          closeDialog,
        },
      },
      filterNoteList: {
        id: 2,
        action: 'Filter',
        desc: 'Enter a name to filter the list',
        dialogComponent: SearchNoteDialog,
        dialogProps: {
          filter: collectionFilter,
          filterHandler: setCollectionFilter,
          closeDialog,
        },
      },
    },
  });

  return (
    <section id="notes-overview">
      <ElementOverview
        element={notesElement()}
        collection={(
          <NotesCollection
            items={data}
            filterString={collectionFilter}
            deleteControl={{ idToDelete, setIdToDelete }}
            editControl={{ idToEdit, setIdToEdit }}
            onNoteUpdate={onNoteUpdate}
            onNoteDelete={onNoteDelete}
            noteSubmitStatus={noteSubmitStatus}
          />
        )}
        dialogControls={{
          isDialogOpen,
          toggleDialog,
          openDialog,
          closeDialog,
        }}
      />
    </section>
  );
};

NotesOverview.propTypes = {
  data: PropTypes.arrayOf(notePropTypes),
  onNotePost: PropTypes.func,
  onNoteUpdate: PropTypes.func,
  onNoteDelete: PropTypes.func,
  noteSubmitStatus: PropTypes.shape({
    ...submitStatusPropTypes,
    submitResponse: notePropTypes,
  }),
};

NotesOverview.defaultProps = {
  data: [],
  onNotePost: () => {},
  onNoteUpdate: () => {},
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

export default NotesOverview;
