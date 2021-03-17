import { useState } from 'react';

const useDialog = (
  isOpen = false,
) => {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);

  return (
    {
      isDialogOpen,
      toggleDialog: () => setIsDialogOpen(!isDialogOpen),
      openDialog: () => setIsDialogOpen(true),
      closeDialog: () => {
        setIsDialogOpen(false);
      },
    }
  );
};

export default useDialog;
