import React from 'react';
import PromptCard from '../PromptCard';

const func1 = (e) => console.log(e);

const element = {
  name: 'Garden Area',
  collection: 'A collection of areas',
  prompts: [
    {
      action: 'Add new area',
      desc: 'Add a representation of an area of your garden',
      handler: func1,
    },
  ],
};

const renderPrompts = (prompts) => prompts.map((prompt) => (
  <PromptCard
    key={prompt.action}
    action={prompt.action}
    description={prompt.desc}
    handler={prompt.handler}
  />
));

const ElementOverview = () => (
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
      {element.collection}
    </section>
  </article>
);

export default ElementOverview;
