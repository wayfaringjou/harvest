import React from 'react';
import GardenAreas from '../GardenAreas';
import Notes from '../Notes/Notes';
import Plants from '../Plants';

console.log('garden');
const Garden = () => (
  <section className="garden-overview">
    <GardenAreas />
    <Plants />
    <Notes />
  </section>
);

export default Garden;
