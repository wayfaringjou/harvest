/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PromptCard from '../PromptCard';

const renderPrompts = (prompts, wrapperHandler, actionFeedback) => prompts.map((prompt) => (
  <PromptCard
    key={prompt.action}
    action={prompt.action}
    description={prompt.desc}
    submitHandler={prompt.submitHandler}
    dialog={prompt.dialog}
    dialogHandler={wrapperHandler}
    actionFeedback={actionFeedback}
  />
));

const ElementOverview = ({
  element, renderCollection, actionFeedback, customDialog,
}) => {
  const [dialog, setDialog] = useState({ content: '', open: false, actionFeedback });
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
        {renderPrompts(element.prompts, setDialog, actionFeedback)}

        {(dialog.open) && (
        <section
          className="dialog-wrapper"
        >
          <button type="button" onClick={() => setDialog({ ...dialog, open: false })}>
            X
          </button>
          {dialog.content}
        </section>
        )}

      </section>
      <aside>
        {customDialog}
      </aside>
      <section
        className="overview-display"
      >
        {renderCollection(element.collection)}
      </section>
    </article>
  );
};

ElementOverview.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    prompts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func])),
    collection: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  renderCollection: PropTypes.func.isRequired,
};

export default ElementOverview;
