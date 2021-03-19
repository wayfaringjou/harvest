/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './PromptCard.css';

const actionClickHandler = (diagCont, currDiagCont, promptId) => {
  if (currDiagCont.activeDialogId === undefined) {
    currDiagCont.handleSetActionDialog(promptId);
    diagCont.openDialog();
  } else if (currDiagCont.activeDialogId !== promptId) {
    currDiagCont.handleSetActionDialog(promptId);
    if (diagCont.isDialogOpen) {
      diagCont.closeDialog();
      setTimeout(() => diagCont.openDialog(), 0);
    } else {
      diagCont.openDialog();
    }
  } else {
    diagCont.toggleDialog();
  }
};

const PromptCard = ({
  action,
  // description,
  dialogControls,
  currentDialogControls,
  promptId,
}) => (
  <article className="prompt-card">
    <button
      onClick={() => {
        actionClickHandler(
          dialogControls,
          currentDialogControls,
          promptId,
        );
      }}
      type="button"
    >
      <span className="btn-label">
        {action}
      </span>
    </button>
    {/*
    <p className="prompt-card-description">
      <span className="caption">
        {description}
      </span>
    </p>
    */}
  </article>
);

export default PromptCard;

PromptCard.propTypes = {
  action: PropTypes.string,
  // description: PropTypes.string,
  // handler: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  // dialog: PropTypes.func.isRequired,
  // dialogHandler: PropTypes.func,
};

PromptCard.defaultProps = {
  action: '',
  // description: '',
  // handler: () => {},
  // dialog: Symbol(''),
  // dialogHandler: () => {},
};
