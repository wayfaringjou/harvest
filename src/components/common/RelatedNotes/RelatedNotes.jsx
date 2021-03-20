import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { notesCollection } from '../../../services/resources';
import { NOTES } from '../../../config/routes';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import useGardenContext from '../../../hooks/useGardenContext';
import config from '../../../config/api';
import localStorage from '../../../services/localStorage-methods';

const RelatedNotes = ({ area_id, plant_id }) => {
  const garden = useGardenContext().gardenData.current;

  const ls = localStorage(config.AUTH_TOKEN_KEY);
  const notes = notesCollection({
    path: `${config.API_BASEPATH}/users/${ls.decodeUserData().user_id}/garden/notes`,
  });

  let requestFunction;

  if (area_id) {
    requestFunction = () => notes.getWithQuery(`area_id=${area_id}`);
  } else if (plant_id) {
    requestFunction = () => notes.getWithQuery(`plant_id=${plant_id}`);
  } else {
    requestFunction = () => notes.getWithQuery(`garden_id=${garden.id}`);
  }

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  } = useAPIRetrieve(requestFunction);

  if (isRetrieving) return <p>Loading</p>;

  if (isFailed) {
    return (
      <p>
        There was an error:
        {error.message}
      </p>
    );
  }

  if (data.length === 0) {
    return (
      <p>
        {`No notes related with this ${area_id ? 'area' : 'plant'}.`}
      </p>
    );
  }

  return (
    <section className="related-notes">
      <h3>Related notes</h3>
      {data && (
        <ul>
          {data.map((note) => (
            <li key={note.id}>
              <h4>
                <Link to={`${NOTES}/${note.id}`}>
                  {note.title}
                </Link>
              </h4>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

RelatedNotes.propTypes = {
  plant_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  area_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

RelatedNotes.defaultProps = {
  plant_id: '',
  area_id: '',
};

export default RelatedNotes;
