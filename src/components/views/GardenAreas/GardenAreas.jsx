import React, { useState } from 'react';
import GardenAreasCollection from '../../layout/GardenAreasCollection/GardenAreasCollection';
import useAPIResource from '../../../hooks/useAPIResource';
// import { fetchGardenAreas } from '../../../services/fakeAPI';
// eslint-disable-next-line no-unused-vars
import { gardenAreasCollection, gardenAreaSingleton } from '../../../services/resources';

const areas = gardenAreasCollection();

// const handleAreaRemove()

const GardenAreas = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [reload, setReload] = useState(false);

  const {
    data,
    isRetrieving,
    isFailed,
    // isSuccess,
    error,
  // } = useAPIResource(fetchGardenAreas);
  } = useAPIResource(areas.getAll, reload);

  if (isRetrieving) return <p>Loading</p>;

  if (isFailed) {
    return (
      <p>
        There was an error:
        {error.message}
      </p>
    );
  }

  const handleNewAreaSubmit = async (e, postData) => {
    e.preventDefault();
    setSubmitError('');
    try {
      setIsSubmitting(true);
      const newArea = gardenAreaSingleton(postData);
      const res = await newArea.post(postData);
      console.log(res);

      console.log(reload);
      setReload(!reload);
      if (res.error) throw new Error(res.data);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      setSubmitError(err.message);
    }
    // const res = await newArea.post();
    // console.log(res);

  // return res;
  };

  return (
    <>
      <GardenAreasCollection
        data={data}
        onAreaSubmit={handleNewAreaSubmit}
        submitStatus={{ isSubmitting, submitError }}
      />
    </>
  );
};

export default GardenAreas;
