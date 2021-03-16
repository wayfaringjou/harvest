/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { gardenAreaSingleton } from '../../../services/resources';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import useAPISend from '../../../hooks/useAPISend';
import usePrevious from '../../../hooks/usePrevious';
import Plants from '../Plants';
import useGardenContext from '../../../hooks/useGardenContext';
import AreaPlantsCollection from '../../garden-areas-layout/AreaPlantsCollection';
import RelatedNotes from '../../common/RelatedNotes/RelatedNotes';

const area = gardenAreaSingleton();
const GardenAreaDetail = ({ match: { params: { areaId } } }) => {
  const [reload, setReload] = useState(false);
  const [request, setRequest] = useState(false);
  const [requestFunction, setRequestFunction] = useState(null);

  const { gardenData } = useGardenContext();

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  } = useAPIRetrieve(() => area.getById(areaId), reload);

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

  const [areaData, setAreaData] = useState({ name: '', length_cm: '', width_cm: '' });
  const history = useHistory();

  const lastRetrieveStatus = usePrevious(isRetrieving);

  useEffect(() => {
    if (lastRetrieveStatus === true && isRetrieving === false && isFailed === false) {
      setAreaData(data);
    }
  }, [isRetrieving, isSubmitting]);

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
    <article className="area">
      <form>
        <button type="button" onClick={() => history.goBack()}>Back</button>
        <fieldset>
          <legend>
            <h2>
              Area
            </h2>
          </legend>
          <label htmlFor="area-title">
            <p>Area name:</p>
            <input
              type="text"
              value={areaData.name}
              onChange={({ target: { value } }) => setAreaData({ ...areaData, title: value })}
            />
          </label>
        </fieldset>
      </form>
      <AreaPlantsCollection garden_id={gardenData.current.id} area_id={areaId} />
      <RelatedNotes area_id={areaId} />
    </article>
  );
};

GardenAreaDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
};

GardenAreaDetail.defaultProps = {
  match: {},
};
export default GardenAreaDetail;
