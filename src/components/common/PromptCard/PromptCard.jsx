/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

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
  description,
  dialogControls,
  currentDialogControls,
  promptId,
}) => (
  <article>
    <h4>{description}</h4>
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
  // dialog: PropTypes.func.isRequired,
  // dialogHandler: PropTypes.func,
};

PromptCard.defaultProps = {
  action: '',
  description: '',
  // handler: () => {},
  // dialog: Symbol(''),
  // dialogHandler: () => {},
};
