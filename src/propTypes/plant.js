import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  image_url: PropTypes.string,
  garden_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  area_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  names: PropTypes.arrayOf(PropTypes.string),
  scientific_name: PropTypes.string,
  sowing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  light: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  days_to_harvest: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  row_spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  spread: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fruit_months: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  images: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])),
  treflePath: PropTypes.string,
  gbifspecieskey: PropTypes.string,
});
