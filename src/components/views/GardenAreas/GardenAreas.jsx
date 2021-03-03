import React, { useState } from 'react';
import GardenAreasOverview from '../../layout/GardenAreasOverview/GardenAreasOverview';
import useAPIResource from '../../../hooks/useAPIResource';
// import { fetchGardenAreas } from '../../../services/fakeAPI';
import { gardenAreasCollection, gardenAreaSingleton } from '../../../services/resources';

const areas = gardenAreasCollection();

// const handleAreaRemove()

const GardenAreas = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
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
      setSubmitSuccess(false);
      setIsSubmitting(true);
      const newArea = gardenAreaSingleton(postData);
      const res = await newArea.post(postData);
      if (res.error) throw new Error(res.data);

      setReload(!reload);
      setIsSubmitting(false);
      setSubmitSuccess(true);
    } catch (err) {
      setIsSubmitting(false);
      setSubmitSuccess(false);
      setSubmitError(err.message);
    }
    // const res = await newArea.post();
    // console.log(res);

  // return res;
  };

  return (
    <>
      <GardenAreasOverview
        data={data}
        onAreaSubmit={handleNewAreaSubmit}
        areaSubmitStatus={{
          isSubmitting,
          submitError,
          submitSuccess,
          setSubmitSuccess,
        }}
      />
    </>
  );
};

export default GardenAreas;
