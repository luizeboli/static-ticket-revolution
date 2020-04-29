import client, { wrapPromise } from './client';

const doLogin = (us, pw) => {
  const auth = window.btoa(`${us}:${pw}`);

  return client('/Login', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
  });
};

const getTickets = () => ({
  fetch: wrapPromise(client('/tickets/inbox/createdate?count=150&skip=0')),
});

export { doLogin, getTickets };
