import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
});
