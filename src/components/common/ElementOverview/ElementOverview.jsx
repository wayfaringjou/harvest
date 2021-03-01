import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PromptCard from '../PromptCard';

const renderPrompts = (prompts, wrapper) => prompts.map((prompt) => (
  <PromptCard
    key={prompt.action}
    action={prompt.action}
    description={prompt.desc}
    // handler={prompt.handler}
    dialog={prompt.dialog}
    dialogHandler={wrapper}
  />
));

const ElementOverview = ({ element, renderCollection }) => {
  const [dialog, setDialog] = useState({ content: '', open: false });
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
        {renderPrompts(element.prompts, setDialog)}

        {(dialog.open) && (
        <section
          className="dialog-wrapper"
        >
          {console.log(dialog.content)}
          <button type="button" onClick={() => setDialog({ ...dialog, open: false })}>
            X
          </button>
          {dialog.content}
        </section>
        )}

      </section>
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
    prompts: PropTypes.arrayOf(PropTypes.object),
    collection: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  renderCollection: PropTypes.func.isRequired,
};

export default ElementOverview;
