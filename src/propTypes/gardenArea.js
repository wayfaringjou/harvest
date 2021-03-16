import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  garden_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  length_cm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width_cm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
});
