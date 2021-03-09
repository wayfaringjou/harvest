import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ElementOverview from '../../common/ElementOverview';
import useDialog from '../../../hooks/useDialog';
import PlantsCollection from '../PlantsCollection';
import AddPlantDialog from '../AddPlantDialog';
import SearchPlantDialog from '../SearchPlantDialog';
import plantPropTypes from '../../../propTypes/plant';
import submitStatusPropTypes from '../../../propTypes/submitStatus';

const PlantsOverview = ({
  data,
  garden_id,
  onPlantPost,
  plantSubmitStatus,
  onPlantUpdate,
  onPlantDelete,
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

  const plantsElement = () => ({
    id: 'plants-overview',
    name: 'Your plants',
    // collection: data,
    prompts: {
      addPlant: {
        id: 1,
        action: 'Add new plant',
        desc: 'Add a representation of a plant in your garden',
        dialogComponent: AddPlantDialog,
        dialogProps: {
          onPlantSubmit: onPlantPost,
          plantSubmitStatus,
          closeDialog,
        },
      },
      filterPlantList: {
        id: 2,
        action: 'Filter',
        desc: 'Enter a name to filter the list',
        dialogComponent: SearchPlantDialog,
        dialogProps: {
          filter: collectionFilter,
          filterHandler: setCollectionFilter,
          closeDialog,
        },
      },
    },
  });

  return (
    <section id="plants-overview">
      <ElementOverview
        element={plantsElement()}
        collection={(
          <PlantsCollection
            items={data}
            garden_id={garden_id}
            filterString={collectionFilter}
            deleteControl={{ idToDelete, setIdToDelete }}
            editControl={{ idToEdit, setIdToEdit }}
            onPlantUpdate={onPlantUpdate}
            onPlantDelete={onPlantDelete}
            plantSubmitStatus={plantSubmitStatus}
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

PlantsOverview.propTypes = {
  data: PropTypes.arrayOf(plantPropTypes),
  garden_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPlantPost: PropTypes.func,
  onPlantUpdate: PropTypes.func,
  onPlantDelete: PropTypes.func,
  plantSubmitStatus: PropTypes.shape({
    ...submitStatusPropTypes,
    submitResponse: plantPropTypes,
  }),
};

PlantsOverview.defaultProps = {
  data: [],
  garden_id: '',
  onPlantPost: () => {},
  onPlantUpdate: () => {},
  onPlantDelete: () => {},
  plantSubmitStatus: {
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
    submitResponse: null,
    setSubmitSuccess: () => {},
    setSubmitError: () => {},
  },
};

export default PlantsOverview;
