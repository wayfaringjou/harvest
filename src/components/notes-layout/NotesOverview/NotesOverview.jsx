import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ElementOverview from '../../common/ElementOverview';
import useDialog from '../../../hooks/useDialog';
import NotesCollection from '../NotesCollection';
import AddNoteDialog from '../AddNoteDialog';
import SearchNoteDialog from '../SearchNoteDialog';
import notePropTypes from '../../../propTypes/note';
import submitStatusPropTypes from '../../../propTypes/submitStatus';
import useGardenContext from '../../../hooks/useGardenContext';

const NotesOverview = ({
  data,
  isRetrieving,
  onNotePost,
  noteSubmitStatus,
  onNoteUpdate,
  onNoteDelete,
}) => {
  const [collectionFilter, setCollectionFilter] = useState('');
  const [idToDelete, setIdToDelete] = useState('');
  const [idToEdit, setIdToEdit] = useState('');

  const { gardenData } = useGardenContext();

  const {
    isDialogOpen,
    toggleDialog,
    openDialog,
    closeDialog,
  } = useDialog();

  const notesElement = () => ({
    id: 'notes-overview',
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
          noteData: {
            id: '',
            title: '',
            user_id: gardenData.current.user_id,
            garden_id: gardenData.current.id,
            area_id: '',
            plant_id: '',
            content: '',
          },
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
            isRetrieving={isRetrieving}
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
  isRetrieving: PropTypes.bool,
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
  isRetrieving: false,
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
