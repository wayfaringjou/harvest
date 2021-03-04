/* eslint-disable react/prop-types */
import React from 'react';
import PromptCard from '../../common/PromptCard';
import AddGardenAreaDialog from '../AddGardenAreaDialog';

/*
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

prompts: [{
      action: 'Add new area',
      desc: 'Add a representation of an area of your garden',
      // eslint-disable-next-line react/prop-types
      dialog: ({ submitHandler, statusData }) => (
        <AddGardenAreaDialog
          onAreaSubmit={submitHandler}
          submitStatus={statusData}
        />
      ),
      submitHandler: onAreaSubmit,
    }],
*/
// eslint-disable-next-line react/prop-types
const GardenAreasPrompts = ({
  onAreaSubmit, areaSubmitStatus, toggleModal, setModalContent,
}) => {
  console.log(areaSubmitStatus);
  return (
    <>
      <PromptCard
        key="add-area"
        action="Add new area"
        description="Identify an area of your garden and add it here to log it's progress."
        submitHandler={onAreaSubmit}
        dialog={AddGardenAreaDialog({ onAreaSubmit, areaSubmitStatus })}
        dialogHandler={toggleModal}
        dialogContentHandler={setModalContent}
        actionFeedback={areaSubmitStatus}
      />
    </>
  );
};

export default GardenAreasPrompts;
