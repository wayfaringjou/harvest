import React from 'react';
import PropTypes from 'prop-types';
import PromptCard from '../PromptCard';

const renderPrompts = (prompts) => prompts.map((prompt) => (
  <PromptCard
    key={prompt.action}
    action={prompt.action}
    description={prompt.desc}
    handler={prompt.handler}
  />
));

const renderCollection = (items) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <p>{item.name}</p>
        <p>{`${item.length_cm}cm x ${item.width_cm}cm`}</p>
      </li>
    ))}
  </ul>
);

const ElementOverview = ({ element }) => (
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
      {renderPrompts(element.prompts)}
    </section>
    <section
      className="overview-display"
    >
      {renderCollection(element.collection)}
    </section>
  </article>
);

ElementOverview.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    prompts: PropTypes.arrayOf(PropTypes.object),
    collection: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default ElementOverview;
