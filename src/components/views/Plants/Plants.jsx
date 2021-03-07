import React, { useState } from 'react';
import PlantsOverview from '../../plants-layout/PlantsOverview';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import useAPISend from '../../../hooks/useAPISend';
import { plantsCollection, plantSingleton } from '../../../services/resources';

// import { fetchPlants } from '../../../services/fakeAPI';

const plants = plantsCollection();
// console.log(plants.searchPlantsData('strawberry'));

console.log(plants);

const Plants = () => {
  const [reload, setReload] = useState(false);
  const [request, setRequest] = useState(false);
  const [requestFunction, setRequestFunction] = useState(null);

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  } = useAPIRetrieve(plants.getAll, reload);

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

  if (isRetrieving) return <p>Loading</p>;

  if (isFailed) {
    return (
      <p>
        There was an error:
        {error.message}
      </p>
    );
  }

  const handlePlantRequest = async (e, reqData, reqType) => {
    e.preventDefault();
    // Create a new area object with data from request
    const plant = plantSingleton(reqData);
    switch (reqType) {
      case 'POST':
        setRequestFunction({ request: plant.post });
        setRequest(!request);
        break;
      case 'PATCH':
        setRequestFunction({ request: plant.patch });
        setRequest(!request);
        break;
      case 'DELETE':
        setRequestFunction({ request: plant.delete });
        setRequest(!request);
        break;
      default:
        throw new Error('Invalid method');
    }
  };

  return (
    <PlantsOverview
      data={data}
      onPlantPost={(e, newPlant) => {
        handlePlantRequest(e, newPlant, 'POST');
      }}
      onPlantUpdate={(e, updatePlant) => {
        handlePlantRequest(e, updatePlant, 'PATCH');
      }}
      onPlantDelete={(e, idToDelete) => {
        handlePlantRequest(e, idToDelete, 'DELETE');
      }}
      plantSubmitStatus={{
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
  );
};

export default Plants;