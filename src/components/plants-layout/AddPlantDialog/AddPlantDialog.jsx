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
import RelationSelector from '../../notes-layout/RelationSelector';

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
    sowing: sowing || '',
    light: light || '',
    days_to_harvest: days_to_harvest || '',
    row_spacing: row_spacing.cm || '',
    spread: spread.cm || '',
    fruit_months: fruit_months ? fruit_months.join(', ') : '',
    native: newPlantData.distribution.native || [],
    images: images || {},
  });
};

const AddPlantDialog = ({
  onPlantSubmit,
  plantSubmitStatus,
  closeDialog,
  plantData,
}) => {
  const garden = useGardenContext().gardenData.current;

  const [newPlant, setNewPlant] = useState({ ...plantData, garden_id: garden.id });
  const [selectedPlant, setSelectedPlant] = useState('');

  const plant = plantSingleton({ ...newPlant });

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
      setNewPlant({ ...newPlant, ...trefleData, treflePath: selectedPlant });
    }

    return () => () => plantSubmitStatus.setSubmitSuccess(false);
  }, [plantSubmitStatus.isSubmitting, isRetrieving]);

  if (plantSubmitStatus.submitSuccess) {
    return <p>Success</p>;
  }
  /*
  if (newPlant) {
    console.log(newPlant);
  }
*/
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
        <p>
          Fill plant information below or enter the plant&apos;s
          scientific or common name here to gather it&apos;s data:
        </p>
        <ApiAutocomplete setSelected={setSelectedPlant} />
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
            placeholder="'Garden tomato'"
          />
        </label>
        {(newPlant.names && newPlant.names.length > 0) && (
          <section className="common-names">
            <p>Other names:</p>
            <ul>
              {newPlant.names.map((name) => (
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
            required
            id="plant-scientific-name"
            type="text"
            onChange={({ target: { value } }) => setNewPlant(
              { ...newPlant, scientific_name: value },
            )}
            value={newPlant.scientific_name}
            placeholder="'Solanum lycopersicum'"
          />
        </label>

      </section>
      {(newPlant.native.length > 0)
      && (
      <section className="plant-native">
        <p>Native to:</p>
        <ul>
          {newPlant.native.map((place) => (
            <li key={place}>
              <small>{place}</small>
            </li>
          ))}
        </ul>
      </section>
      )}
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
              { ...newPlant, sowing: value },
            )}
            value={newPlant.sowing}
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
              { ...newPlant, light: value },
            )}
            value={newPlant.light}
            placeholder="'8'"
          />
        </label>
        <label htmlFor="plant-days-to-harvest">
          <p>Average days to harvest:</p>
          <input
            required
            id="plant-days-to-harvest"
            type="number"
            onChange={({ target: { value } }) => setNewPlant(
              { ...newPlant, days_to_harvest: value },
            )}
            value={newPlant.days_to_harvest}
            placeholder="'80'"
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
              { ...newPlant, row_spacing: value },
            )}
            value={newPlant.row_spacing}
            placeholder="'54'"
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
              { ...newPlant, spread: value },
            )}
            value={newPlant.spread}
            placeholder="'76'"
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
              { ...newPlant, fruit_months: value },
            )}
            value={newPlant.fruit_months}
            placeholder="'June, July, August'"
          />
        </label>
      </section>
      <section className="plant-area">
        <RelationSelector
          type="Area"
          onSelect={(value) => setNewPlant({ ...newPlant, area_id: value })}
          selection={newPlant.area_id}
        />
      </section>
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
    sowing: '',
    light: '',
    days_to_harvest: '',
    row_spacing: '',
    spread: '',
    fruit_months: '',
    native: [],
    images: {},
    treflePath: '',
    gbifSpeciesKey: '',
  },
};
export default AddPlantDialog;
