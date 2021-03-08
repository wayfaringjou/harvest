import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  user_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  garden_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  area_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  plant_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  content: PropTypes.string,
  title: PropTypes.string,
});
