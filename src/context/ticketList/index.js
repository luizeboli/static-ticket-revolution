/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { getTickets } from 'services/api';

const TicketListContext = React.createContext();

const TicketListProvider = (props) => {
  const [loadTicketList, setLoadTicketList] = useState(getTickets);

  const updateTicketList = () => setLoadTicketList(getTickets);

  return <TicketListContext.Provider value={{ loadTicketList, updateTicketList }} {...props} />;
};

const useTicketList = () => {
  const context = React.useContext(TicketListContext);
  if (context === undefined) {
    throw new Error('useTicketList must be used within a TicketListProvider');
  }
  return context;
};

export { TicketListProvider, useTicketList };
