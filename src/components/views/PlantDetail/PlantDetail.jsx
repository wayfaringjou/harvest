/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { plantSingleton } from '../../../services/resources';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import useAPISend from '../../../hooks/useAPISend';
import usePrevious from '../../../hooks/usePrevious';
import RelationSelector from '../../notes-layout/RelationSelector';
import RelatedNotes from '../../common/RelatedNotes/RelatedNotes';

const plant = plantSingleton();
const PlantDetail = ({ match: { params: { plantId } } }) => {
  const [reload, setReload] = useState(false);
  const [request, setRequest] = useState(false);
  const [requestFunction, setRequestFunction] = useState(null);
  const [deleted, setDeleted] = useState(false);

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

  const [plantData, setPlantData] = useState({
    id: plantId,
    name: '',
    image_url: '',
    garden_id: '',
    area_id: '',
    names: [],
    scientific_name: '',
    sowing: '',
    light: '',
    days_to_harvest: '',
    row_spacing: '',
    spread: '',
    fruit_months: '',
    images: {},
    treflePath: '',
    gbifspecieskey: '',
  });
  const history = useHistory();

  const lastRetrieveStatus = usePrevious(isRetrieving);
  const lastSubmitStatus = usePrevious(isSubmitting);

  const handlePlantRequest = async (e, reqData, reqType) => {
    e.preventDefault();
    // Create a new plant object with data from request
    const updatePlant = plantSingleton(reqData);
    switch (reqType) {
      case 'PATCH':
        setRequestFunction({ request: updatePlant.patch });
        setRequest(!request);
        break;
      case 'DELETE':
        setRequestFunction({ request: updatePlant.delete });
        setDeleted(true);
        setRequest(!request);
        break;
      default:
        throw new Error('Invalid method');
    }
  };

  useEffect(() => {
    if (lastRetrieveStatus === true && isRetrieving === false && isFailed === false) {
      const parsedPlantData = {};
      Object.keys(data).forEach((key) => (
        parsedPlantData[key] = data[key] === null ? '' : data[key]
      ));
      setPlantData({ ...parsedPlantData });
    }
    if (lastSubmitStatus === true && isSubmitting === false && deleted === true && submitSuccess) {
      history.push('/garden');
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
      <form onSubmit={(e) => handlePlantRequest(e, plantData, 'PATCH')}>
        <button type="button" onClick={() => history.goBack()}>Back</button>
        <fieldset>
          <legend>
            <h2>
              Plant details:
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

          <section className="plant-name-data">
            <label htmlFor="plant-name">
              <p>Plant name:</p>
              <input
                required
                id="plant-name"
                type="text"
                onChange={({ target: { value } }) => setPlantData(
                  { ...plantData, name: value },
                )}
                value={plantData.name}
                placeholder="'Garden tomato'"
              />
            </label>
            {(plantData.names && plantData.names.length > 0) && (
            <section className="common-names">
              <p>Other names:</p>
              <ul>
                {plantData.names.map((name) => (
                  <li key={name}>
                    <small>{name}</small>
                  </li>
                ))}
              </ul>
            </section>
            )}
            <label htmlFor="plant-scientific-name">
              <p>Scientific name:</p>
              <input
                id="plant-scientific-name"
                type="text"
                onChange={({ target: { value } }) => setPlantData(
                  { ...plantData, scientific_name: value },
                )}
                value={plantData.scientific_name}
                placeholder="'Solanum lycopersicum'"
              />
            </label>
          </section>

          <section className="plant-images">
            <ul className="plant-images-wrapper">
              {console.log(plantData)}
              {plantData.images && Object.keys(plantData.images).map((key) => (
                <li key={plantData.images[key][0].id}>
                  <p>{key}</p>
                  <img
                    src={plantData.images[key][0].image_url}
                    alt={`${plantData.name} ${key}`}
                  />
                </li>
              ))}
            </ul>
          </section>
          <section className="growth-data">
            <label htmlFor="plant-sowing">
              <p>Sowing recommendations:</p>
              <textarea
                id="plant-sowing"
                type="text"
                onChange={({ target: { value } }) => setPlantData(
                  { ...plantData, sowing: value },
                )}
                value={plantData.sowing}
                placeholder="'Sowing info'"
              />
            </label>
            <label htmlFor="plant-light">
              <p>Required amount of light:</p>
              <p>{'On a scale from 0 (no light, <= 10 lux) to 10 (very intensive insolation, >= 100 000 lux)'}</p>
              <input
                id="plant-light"
                type="number"
                onChange={({ target: { value } }) => setPlantData(
                  { ...plantData, light: value },
                )}
                value={plantData.light}
                placeholder="'8'"
              />
            </label>
            <label htmlFor="plant-days-to-harvest">
              <p>Average days to harvest:</p>
              <input
                id="plant-days-to-harvest"
                type="number"
                onChange={({ target: { value } }) => setPlantData(
                  { ...plantData, days_to_harvest: value },
                )}
                value={plantData.days_to_harvest}
                placeholder="'80'"
              />
            </label>
            <label htmlFor="plant-row-spacing">
              <p>Row spacing:</p>
              <p>The minimum spacing between each rows of plants, in centimeters</p>
              <input
                id="plant-row-spacing"
                type="number"
                onChange={({ target: { value } }) => setPlantData(
                  { ...plantData, row_spacing: value },
                )}
                value={plantData.row_spacing}
                placeholder="'54'"
              />
            </label>
            <label htmlFor="plant-spread">
              <p>Spread:</p>
              <p>The average spreading of the plant, in centimeters</p>
              <input
                id="plant-spread"
                type="number"
                onChange={({ target: { value } }) => setPlantData(
                  { ...plantData, spread: value },
                )}
                value={plantData.spread}
                placeholder="'76'"
              />
            </label>
            <label htmlFor="plant-fruit-months">
              <p>Fruit months:</p>
              <p>The months the species usually produces fruits</p>
              <input
                id="plant-fruit-months"
                type="text"
                onChange={({ target: { value } }) => setPlantData(
                  { ...plantData, fruit_months: value },
                )}
                value={plantData.fruit_months}
                placeholder="'June, July, August'"
              />
            </label>
          </section>
          <section className="plant-area">
            <RelationSelector
              type="Area"
              onSelect={(value) => setPlantData({ ...plantData, area_id: value })}
              selection={plantData.area_id || ''}
            />
          </section>
          <button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && 'Saving...'}
            {!isSubmitting && (
              submitSuccess
                ? 'Changes Saved'
                : 'Save changes'
            )}
          </button>

        </fieldset>
      </form>
      <button
        type="button"
        onClick={(e) => handlePlantRequest(e, plantData, 'DELETE')}
      >
        Delete plant
      </button>
      <RelatedNotes plant_id={plantId} />
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
