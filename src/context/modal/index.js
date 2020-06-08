import React, { useCallback, useState } from 'react';
import { NewTicketModal } from 'components/Modals';

const ModalContext = React.createContext();

const modals = {
  NewTck: NewTicketModal,
};

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);
  const unSetModal = useCallback(() => {
    setModal();
  }, [setModal]);

  const ModalComponent = modals[modal];

  return (
    <ModalContext.Provider value={{ unSetModal, setModal }}>
      {children}
      {modal && <ModalComponent unSetModal={unSetModal} />}
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
