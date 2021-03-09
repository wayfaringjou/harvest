/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { plantSingleton } from '../../../services/resources';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import useAPISend from '../../../hooks/useAPISend';
import usePrevious from '../../../hooks/usePrevious';

const plant = plantSingleton();
const PlantDetail = ({ match: { params: { plantId } } }) => {
  const [reload, setReload] = useState(false);
  const [request, setRequest] = useState(false);
  const [requestFunction, setRequestFunction] = useState(null);

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  } = useAPIRetrieve(() => plant.getById(plantId), reload);

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

  const [plantData, setPlantData] = useState({ name: '' });
  const history = useHistory();

  const lastRetrieveStatus = usePrevious(isRetrieving);

  useEffect(() => {
    if (lastRetrieveStatus === true && isRetrieving === false && isFailed === false) {
      setPlantData(data);
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
    <article className="plant">
      <form>
        <button type="button" onClick={() => history.goBack()}>Back</button>
        <fieldset>
          <legend>
            <h2>
              Plant
            </h2>
          </legend>
          <label htmlFor="plant-title">
            <p>Plant name:</p>
            <input
              type="text"
              value={plantData.name}
              onChange={({ target: { value } }) => setPlantData({ ...plantData, title: value })}
            />
          </label>
        </fieldset>
      </form>
    </article>
  );
};

PlantDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
};

PlantDetail.defaultProps = {
  match: {},
};
export default PlantDetail;
