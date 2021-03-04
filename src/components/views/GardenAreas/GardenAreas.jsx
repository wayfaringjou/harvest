import React, { useState } from 'react';
import GardenAreasOverview from '../../garden-areas-layout/GardenAreasOverview/GardenAreasOverview';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import useAPISend from '../../../hooks/useAPISend';
// import { fetchGardenAreas } from '../../../services/fakeAPI';
import { gardenAreasCollection, gardenAreaSingleton } from '../../../services/resources';

const areas = gardenAreasCollection();

const GardenAreas = () => {
  const [reload, setReload] = useState(false);
  const [request, setRequest] = useState(false);
  const [requestFunction, setRequestFunction] = useState(null);

  const {
    data,
    isRetrieving,
    isFailed,
    // isSuccess,
    error,
  // } = useAPIResource(fetchGardenAreas);
  } = useAPIRetrieve(areas.getAll, reload);

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

  const handleAreaRequest = async (e, reqData, reqType) => {
    e.preventDefault();
    // Create a new area object with data from request
    const area = gardenAreaSingleton(reqData);

    switch (reqType) {
      case 'POST':
        setRequestFunction({ request: area.post });
        setRequest(!request);
        break;
      case 'PATCH':
        setRequestFunction({ request: area.patch });
        setRequest(!request);
        break;
      case 'DELETE':
        setRequestFunction({ request: area.delete });
        setRequest(!request);
        break;
      default:
        throw new Error('Invalid method');
    }
  };

  return (
    <>
      <GardenAreasOverview
        data={data}
        onAreaPost={(e, newArea) => {
          handleAreaRequest(e, newArea, 'POST');
        }}
        onAreaUpdate={(e, updateArea) => {
          handleAreaRequest(e, updateArea, 'PATCH');
        }}
        onAreaDelete={(e, idToDelete) => {
          handleAreaRequest(e, idToDelete, 'DELETE');
        }}
        areaSubmitStatus={{
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

export default GardenAreas;
