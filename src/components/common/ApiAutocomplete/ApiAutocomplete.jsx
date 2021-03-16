/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import useGardenContext from '../../../hooks/useGardenContext';
import usePrevious from '../../../hooks/usePrevious';
import { plantsCollection } from '../../../services/resources';

const ApiAutocomplete = ({ setSelected }) => {
  const garden = useGardenContext().gardenData.current;
  const plants = plantsCollection(garden.id);

  // Fetch control
  const [reload, setReload] = useState(false);
  const [preventFetch, setPreventFetch] = useState(true);

  // Matches state
  const [string, setString] = useState('');
  const [clear, setClear] = useState(true);

  // Data hook
  const {
    data,
    isRetrieving,
    isFailed,
    error,
  } = useAPIRetrieve(() => plants.searchPlantsData(string), reload, preventFetch);

  // gbif data hook
  const gbif = useAPIRetrieve();

  const lastRetrieveStatus = usePrevious();

  useEffect(async () => {
    // If string is longer than 3 characters
    // and after 1 seconds of input trigger search string in api
    if (string.length >= 3) {
      setPreventFetch(false);
      setClear(false);
      setTimeout(setReload(!reload), 1000);
      // setReload(!reload);
    }

    if (string.length < 3) {
      setClear(true);
    }
  }, [string]);

  /*  const handleKeyUp = () => {

  };
*/
  return (
    <article className="autocomplete-input">
      <input
        type="search"
        value={string}
        onChange={({ target: { value } }) => setString(value)}
      />
      {isRetrieving && <p>loading</p>}
      {(data) && (data.data.length > 0 && clear === false) && (
        <ul>
          {data.data.map((match) => (
            <li
              key={match.id}
            >
              <button
                type="button"
                onClick={() => {
                  setSelected(match.links.self);
                  setString('');
                }}
              >
                {match.common_name}
              </button>
              {` (${match.scientific_name})`}
              <img style={{ height: '150px' }} alt={match.common_name} src={match.image_url !== null && match.image_url} />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

ApiAutocomplete.propTypes = {
  setSelected: PropTypes.func,
};

ApiAutocomplete.defaultProps = {
  setSelected: () => {},
};
export default ApiAutocomplete;
