import React from 'react';
import PropTypes from 'prop-types';

const PromptCard = ({
  action, description, dialog, dialogHandler,
}) => (
  <article>
    <h4>{description}</h4>
    <button
      onClick={() => dialogHandler({ content: dialog, open: true })}
      type="button"
    >
      {action}
    </button>
  </article>
);

export default PromptCard;

PromptCard.propTypes = {
  action: PropTypes.string,
  description: PropTypes.string,
  // handler: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  dialog: PropTypes.object.isRequired,
  dialogHandler: PropTypes.func,
};

PromptCard.defaultProps = {
  action: '',
  description: '',
  // handler: () => {},
  // dialog: Symbol(''),
  dialogHandler: () => {},
};
