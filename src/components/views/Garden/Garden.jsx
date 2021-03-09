import React from 'react';
import GardenAreas from '../GardenAreas';
import Notes from '../Notes/Notes';
import Plants from '../Plants';
import useGardenContext from '../../../hooks/useGardenContext';

const Garden = () => {
  const {
    gardenData, isRetrieving, isFailed, error,
  } = useGardenContext();

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
    <section className="garden-overview">
      <GardenAreas garden_id={gardenData.current.id} />
      <Plants garden_id={gardenData.current.id} />
      <Notes garden_id={gardenData.current.id} />
    </section>
  );
};

export default Garden;
