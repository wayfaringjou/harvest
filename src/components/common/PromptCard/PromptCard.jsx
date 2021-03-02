/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const PromptCard = ({
  action,
  description,
  submitHandler,
  dialog,
  dialogHandler,
  actionFeedback,
}) => (
  <article>
    <h4>{description}</h4>
    <button
      onClick={() => dialogHandler({
        content: dialog({ submitHandler, actionFeedback }),
        open: true,
        actionFeedback,
      })}
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
  dialog: PropTypes.func.isRequired,
  dialogHandler: PropTypes.func,
};

PromptCard.defaultProps = {
  action: '',
  description: '',
  // handler: () => {},
  // dialog: Symbol(''),
  dialogHandler: () => {},
};
