/* eslint-disable react/jsx-props-no-spreading */
import React, { useReducer } from 'react';
import { createContainer } from 'react-tracked';

/**
 * ------------------------------------------------------------------------------------------------>
 * REDUCER
 * ------------------------------------------------------------------------------------------------>
 */

const initialState = {
  ticketList: {
    loading: false,
  },
  counter: 0,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'TICKET_LIST_REQUEST':
      return { ...state, ticketList: { loading: true } };
    case 'TICKET_LIST_SUCCESS':
      return { ...state, ticketList: { loading: false } };
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

const useTicketList = () => {
  const [state, dispatch] = TicketListContainer.useTracked();

  return [state, (args) => {
    console.log(`%c Dispatching action: ${args.type} `, 'background-color: green; color: #FFF; border-radius: 50px');
    dispatch(args);
  }];
};

export { TicketListProvider, useTicketList };
