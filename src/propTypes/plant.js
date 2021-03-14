import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  garden_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  area_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
});
