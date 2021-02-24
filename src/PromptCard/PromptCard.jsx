import React from 'react';
import PropTypes from 'prop-types';

const PromptCard = ({ action, description, handler }) => (
  <article>
    <h4>{description}</h4>
    <button
      onClick={handler}
      type="button"
    >
      {action}
    </button>
  </article>
);

export default PromptCard;

PromptCard.propTypes = {
  action: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};
