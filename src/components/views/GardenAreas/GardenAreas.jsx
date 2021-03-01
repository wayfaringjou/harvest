import React from 'react';
import GardenAreasCollection from '../../layout/GardenAreasCollection/GardenAreasCollection';
import useAPIResource from '../../../hooks/useAPIResource';
// import { fetchGardenAreas } from '../../../services/fakeAPI';
import { gardenAreasCollection } from '../../../services/resources';

const areas = gardenAreasCollection();

const GardenAreas = () => {
  const {
    data,
    isRequesting,
    isFailed,
    // isSuccess,
    error,
  // } = useAPIResource(fetchGardenAreas);
  } = useAPIResource(areas.getAll);
  if (isRequesting) return <p>Loading</p>;

  if (isFailed) {
    return (
      <p>
        There was an error:
        {error.message}
      </p>
    );
  }

  return (
    <>
      <GardenAreasCollection
        data={data}
      />
    </>
  );
};

export default GardenAreas;
