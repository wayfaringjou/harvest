import React from 'react';
import GardenAreas from '../GardenAreas';
import Notes from '../Notes/Notes';
import Plants from '../Plants';
import useGardenContext from '../../../hooks/useGardenContext';

const Garden = () => {
  // Get garden id referenced in context to be passed as prop for
  // areas, plants and notes components
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

  /*
  Each component called below represents an entity used by the app.
  For each entity there is a layout folder and inside an overview component.
  The ElementOverview component is used as a wrapper for each entities collection of data.
  */

  return (
    <section className="garden-overview">
      <GardenAreas garden_id={gardenData.current.id} />
      <Plants garden_id={gardenData.current.id} />
      <Notes garden_id={gardenData.current.id} />
    </section>
  );
};

export default Garden;
