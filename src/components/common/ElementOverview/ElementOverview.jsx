/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const ElementOverview = ({
  element,
  renderCollection,
  elementPrompts,
  modalState,
  toggleModal,
}) => {
  console.log('');
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
        {elementPrompts}
        {(modalState.isModalOpen) && (
        <section
          className="dialog-wrapper"
        >
          <button type="button" onClick={() => toggleModal()}>
            X
          </button>
          {modalState.modalContent}
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
    prompts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func])),
    collection: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  renderCollection: PropTypes.func.isRequired,
};

export default ElementOverview;
