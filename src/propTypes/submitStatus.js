import PropTypes from 'prop-types';

export default {
  isSubmitting: PropTypes.bool,
  submitError: PropTypes.string,
  submitSuccess: PropTypes.bool,
  submitResponse: '',
  setSubmitSuccess: PropTypes.func,
  setSubmitError: PropTypes.func,
};
