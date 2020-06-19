import React, { useCallback, useState } from 'react';
import { NewTicketModal } from 'components/Modals';

const ModalContext = React.createContext();

const modals = {
  NewTck: NewTicketModal,
};

const ModalProvider = ({ children }) => {
  const [modal, setModalComponent] = useState(null);
  const [open, setOpen] = useState(false);

  const unSetModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const ModalComponent = modals[modal];

  const setModal = (modalKey) => {
    setOpen(true);
    setModalComponent(modalKey);
  };

  return (
    <ModalContext.Provider value={{ unSetModal, setModal }}>
      {children}
      {modal && <ModalComponent open={open} unSetModal={unSetModal} />}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a UserProvider');
  }

  return context;
};

export default ModalProvider;
