import { useState } from 'react';

const useModal = (
  isOpen = false,
  content = null,
) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [modalContent, setModalContent] = useState(content);

  return (
    {
      isModalOpen,
      modalContent,
      setModalContent,
      toggleModal: () => {
        setIsModalOpen(!isModalOpen);
      },
    }
  );
};

export default useModal;
