/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import plantPropTypes from '../../../propTypes/plant';
import usePrevious from '../../../hooks/usePrevious';
import ApiAutocomplete from '../../common/ApiAutocomplete';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import { plantSingleton } from '../../../services/resources';
import useGardenContext from '../../../hooks/useGardenContext';

const serializeNewPlantData = (newPlantData) => {
  const growthData = {};
  const images = {};

  /*
    Object.keys(newPlantData.growth).forEach((key) => {
      if (newPlantData.growth[key]) {
        growthData[key] = newPlantData.growth[key];
      }
    });
    */
  Object.keys(newPlantData.images).forEach((key) => {
    if (newPlantData.images[key] && key !== '') {
      images[key] = newPlantData.images[key][0];
    }
  });

  const {
    sowing,
    light,
    days_to_harvest,
    row_spacing,
    spread,
    fruit_months,
  } = newPlantData.growth;

  return ({
    name: newPlantData.common_name || '',
    names: newPlantData.common_names.eng || [],
    scientific_name: newPlantData.scientific_name || '',
    growth: {
      sowing: sowing || '',
      light: light || '',
      days_to_harvest: days_to_harvest || '',
      row_spacing: row_spacing.cm || '',
      spread: spread.cm || '',
      fruit_months: fruit_months ? fruit_months.join(', ') : '',
    } || {},
    distribution: {
      native: newPlantData.distribution.native || [],
    },
    images: images || {},
  });
};

const AddPlantDialog = ({
  onPlantSubmit,
  plantSubmitStatus,
  closeDialog,
  plantData,
}) => {
  const [newPlant, setNewPlant] = useState(plantData);
  const [selectedPlant, setSelectedPlant] = useState('');

  const garden = useGardenContext().gardenData.current;
  const plant = plantSingleton(garden.id);

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  } = useAPIRetrieve(() => plant.getDataWithPath(selectedPlant), selectedPlant, (!selectedPlant));

  const lastStatus = usePrevious(plantSubmitStatus.isSubmitting);
  const lastSelected = usePrevious(setSelectedPlant);

  useEffect(() => {
    if (lastStatus === true && plantSubmitStatus.isSubmitting === false) {
      setTimeout(() => closeDialog(), 2000);
    }

    if (data) {
      const trefleData = serializeNewPlantData(data.data);
      setNewPlant({ ...newPlant, ...trefleData });
    }

    return () => () => plantSubmitStatus.setSubmitSuccess(false);
  }, [plantSubmitStatus.isSubmitting, isRetrieving]);

  if (plantSubmitStatus.submitSuccess) {
    return <p>Success</p>;
  }

  if (data) {
    console.log(data);
  }

  return (
    <form onSubmit={(e) => onPlantSubmit(e, newPlant)}>
      <button
        type="button"
        onClick={() => {
          closeDialog();
        }}
      >
        X
      </button>
      {plantSubmitStatus.submitError && <h4>There was an error</h4>}
      <section className="plant-name-data">

        <label htmlFor="plant-name">
          <p>New plant name:</p>
          <input
            required
            id="plant-name"
            type="text"
            onChange={({ target: { value } }) => setNewPlant(
              { ...newPlant, name: value },
            )}
            value={newPlant.name}
            placeholder="'Tomato', 'Dill'"
          />
        </label>
        <label htmlFor="plant-scientific-name">
          <p>Scientific name:</p>
          <input
            required
            id="plant-scientific-name"
            type="text"
            onChange={({ target: { value } }) => setNewPlant(
              { ...newPlant, scientific_name: value },
            )}
            value={newPlant.scientific_name}
            placeholder="'Tomato', 'Dill'"
          />
        </label>
        {(newPlant.names && newPlant.names.length > 0) && (
          <section className="common-names">
            <ul>
              {newPlant.names.map((name) => (
                <li key={name}>
                  <small>{name}</small>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
      <section className="plant-images">
        <ul>
          {newPlant.images && Object.keys(newPlant.images).map((key) => (
            <li key={newPlant.images[key].id}>
              <p>{key}</p>
              <img
                style={{ height: '150px' }}
                src={newPlant.images[key].image_url}
                alt={`${newPlant.name} ${key}`}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="growth-data">
        <label htmlFor="plant-sowing">
          <p>Sowing recommendations:</p>
          <textarea
            required
            id="plant-sowing"
            type="text"
            onChange={({ target: { value } }) => setNewPlant(
              { ...newPlant, growth: { ...newPlant.growth, sowing: value } },
            )}
            value={newPlant.growth.sowing}
            placeholder="'Sowing info'"
          />
        </label>
        <label htmlFor="plant-light">
          <p>Required amount of light:</p>
          <p>{'On a scale from 0 (no light, <= 10 lux) to 10 (very intensive insolation, >= 100 000 lux)'}</p>
          <input
            required
            id="plant-light"
            type="number"
            onChange={({ target: { value } }) => setNewPlant(
              { ...newPlant, growth: { ...newPlant.growth, light: value } },
            )}
            value={newPlant.growth.light}
            placeholder="'0 to 10'"
          />
        </label>
        <label htmlFor="plant-days-to-harvest">
          <p>Average days to harvest:</p>
          <input
            required
            id="plant-days-to-harvest"
            type="number"
            onChange={({ target: { value } }) => setNewPlant(
              { ...newPlant, growth: { ...newPlant.growth, days_to_harvest: value } },
            )}
            value={newPlant.growth.days_to_harvest}
            placeholder="'45'"
          />
        </label>
        <label htmlFor="plant-row-spacing">
          <p>Row spacing:</p>
          <p>The minimum spacing between each rows of plants, in centimeters</p>
          <input
            required
            id="plant-row-spacing"
            type="number"
            onChange={({ target: { value } }) => setNewPlant(
              { ...newPlant, growth: { ...newPlant.growth, row_spacing: value } },
            )}
            value={newPlant.growth.row_spacing}
            placeholder="'45'"
          />
        </label>
        <label htmlFor="plant-spread">
          <p>Spread:</p>
          <p>The average spreading of the plant, in centimeters</p>
          <input
            required
            id="plant-spread"
            type="number"
            onChange={({ target: { value } }) => setNewPlant(
              { ...newPlant, growth: { ...newPlant.growth, spread: value } },
            )}
            value={newPlant.growth.spread}
            placeholder="'45'"
          />
        </label>
        <label htmlFor="plant-fruit-months">
          <p>Fruit months:</p>
          <p>The months the species usually produces fruits</p>
          <input
            required
            id="plant-fruit-months"
            type="text"
            onChange={({ target: { value } }) => setNewPlant(
              { ...newPlant, growth: { ...newPlant.growth, fruit_months: value } },
            )}
            value={newPlant.growth.fruit_months}
            placeholder="'April, May'"
          />
        </label>
      </section>
      <ApiAutocomplete setSelected={setSelectedPlant} />
      <button
        type="submit"
        disabled={plantSubmitStatus.isSubmitting}
      >
        {plantSubmitStatus.isSubmitting ? 'Saving...' : 'Submit'}
      </button>
    </form>
  );
};

AddPlantDialog.propTypes = {
  onPlantSubmit: PropTypes.func,
  plantSubmitStatus: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    submitError: PropTypes.string,
    submitSuccess: PropTypes.bool,
    submitResponse: plantPropTypes,
    setSubmitSuccess: PropTypes.func,
    setSubmitError: PropTypes.func,
  }),
  closeDialog: PropTypes.func,
  plantData: plantPropTypes,
};
AddPlantDialog.defaultProps = {
  onPlantSubmit: () => {},
  plantSubmitStatus: {
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
    submitResponse: null,
    setSubmitSuccess: () => {},
    setSubmitError: () => {},
  },
  closeDialog: () => {},
  plantData: {
    id: '',
    name: '',
    garden_id: '',
    area_id: '',
    names: [],
    scientific_name: '',
    growth: {
      sowing: '',
      light: '',
      days_to_harvest: '',
      row_spacing: '',
      spread: '',
      fruit_months: '',
    },
    distribution: {
      native: [],
    },
    images: {},
  },
};
export default AddPlantDialog;
