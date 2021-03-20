import React from 'react';
import PropTypes from 'prop-types';
import { plantsCollection } from '../../../services/resources';
import useAPIRetrieve from '../../../hooks/useAPIRetrieve';
import './PlantsListSimple.css';

const PlantsListSimple = ({ garden_id, area_id }) => {
  const plants = plantsCollection(garden_id);

  const {
    data,
    isRetrieving,
    isFailed,
    error,
  } = useAPIRetrieve(() => plants.getWithQuery(`area_id=${area_id}`));

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
    <section className="planted-list">
      {data.length > 0 && <h5>Planted here:</h5>}
      <ul className="plants-symbols">
        {data.map((item) => {
          const { images } = item;
          let image_url;
          if (images) {
            const { fruit, flower, leaf } = images;

            if (fruit) {
              image_url = fruit[0].image_url;
            } else if (flower) {
              image_url = flower[0].image_url;
            } else if (leaf) {
              image_url = leaf[0].image_url;
            }
          }
          return (
            <li className="symbol-container" key={item.id}>
              <div className="symbol-wrapper">
                {image_url
                  ? (<img src={image_url} alt={item.name} />)
                  : (<span className="symbol-name">{item.name[0]}</span>)}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

PlantsListSimple.propTypes = {
  garden_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  area_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

PlantsListSimple.defaultProps = {
  garden_id: '',
  area_id: '',
};
export default PlantsListSimple;
