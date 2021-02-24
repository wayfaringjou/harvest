import React from 'react';

const element = {
  name: 'Garden Area',
};
const ElementOverview = () => (
  <article
    className="element-overview"
  >
    <header
      className="overview-header"
    >
      <h2>{element.name}</h2>
    </header>
    <section
      className="overview-prompts"
    >
      <button type="button">Do something</button>
    </section>
  </article>
);

export default ElementOverview;
