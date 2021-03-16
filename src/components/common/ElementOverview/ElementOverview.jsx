/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import PromptCard from '../PromptCard';
import './ElementOverview.css';

const renderPrompts = (
  prompts,
  dialogControls,
  currentDialogControls,
) => Object.keys(prompts).map((key) => {
  const prompt = prompts[key];
  return (
    <PromptCard
      key={key}
      action={prompt.action}
      description={prompt.desc}
      dialogControls={dialogControls}
      currentDialogControls={currentDialogControls}
      promptId={key}
    />
  );
});

const ElementOverview = ({
  element,
  collection,
  dialogControls,
}) => {
  const actionDialog = useRef();
  const {
    isDialogOpen,
    openDialog,
    closeDialog,
    toggleDialog,
  } = dialogControls;

  const handleSetActionDialog = (promptKey) => {
    actionDialog.current = promptKey;
  };

  return (
    <article
      className="element-overview"
      id={element.id}
    >
      <header
        className="overview-header"
      >
        <h2>{element.name}</h2>
      </header>
      <section
        className="overview-prompts"
      >

        {renderPrompts(
          element.prompts,
          {
            isDialogOpen, openDialog, closeDialog, toggleDialog,
          },
          { handleSetActionDialog, activeDialogId: actionDialog.current },
        )}

        {(isDialogOpen) && (
        <section
          className="dialog-wrapper"
        >
          {React.createElement(
            element.prompts[actionDialog.current].dialogComponent,
            element.prompts[actionDialog.current].dialogProps,
          )}
        </section>
        )}
      </section>
      <section
        className="overview-display"
      >
        {collection}
      </section>
    </article>
  );
};

ElementOverview.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    prompts: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func])),
    collection: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  // renderCollection: PropTypes.func.isRequired,
};

export default ElementOverview;
