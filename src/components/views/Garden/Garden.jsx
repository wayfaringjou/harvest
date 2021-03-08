import React, { useRef } from 'react';
import GardenAreas from '../GardenAreas';
import Notes from '../Notes/Notes';
import Plants from '../Plants';
import { gardenSingleton } from '../../../services/resources';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';

const garden = gardenSingleton();
const Garden = () => {
  const {
    data,
    isRetrieving,
    isFailed,
    error,
  } = useAPIRetrieve(garden.getFromPath);

  const garden_id = useRef(null);
  if (data) {
    garden_id.current = data[0].id;
  }

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
      <GardenAreas garden_id={garden_id.current} />
      <Plants garden_id={garden_id.current} />
      <Notes />
    </section>
  );
};

export default Garden;
