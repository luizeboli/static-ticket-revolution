/* eslint-disable react/jsx-props-no-spreading */
import React, { useReducer } from 'react';
import { createContainer } from 'react-tracked';

/**
 * ------------------------------------------------------------------------------------------------>
 * REDUCER
 * ------------------------------------------------------------------------------------------------>
 */

const initialState = {
  ticketList: null,
  counter: 0,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'UPDATE_TICKET_LIST':
      return { ...state, ticketList: payload };
    case 'UPDATE_COUNTER':
      return { ...state, counter: state.counter + 1 };
    default:
      return state;
  }
};

/**
 * ------------------------------------------------------------------------------------------------>
 * CONTAINER
 * ------------------------------------------------------------------------------------------------>
 */

const useValue = () => useReducer(reducer, initialState);
const TicketListContainer = createContainer(useValue);

const TicketListProvider = (props) => (
  <TicketListContainer.Provider {...props} />
);

const useTicketList = () => TicketListContainer.useTracked();

export { TicketListProvider, useTicketList };
