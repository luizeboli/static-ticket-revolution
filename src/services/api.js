import axios from 'axios';

const api = axios.create({ baseURL: 'https://app.hiplatform.com/agent/ticket/1.0', headers: { Authorization: `DT-Fenix-Token ${localStorage.getItem('Token')}` } });

const wrapPromise = (promise) => {
  let status = 'pending';
  let result;
  const suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    },
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
};

const doLogin = (us, pw) => {
  const auth = window.btoa(`${us}:${pw}`);

  return api.post('/Login', null, {
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
  });
};

// const getTickets = () => wrapPromise(api.get('/tickets/inbox/createdate?count=150&skip=0').then((res) => res.data));
const getTickets = () => wrapPromise(new Promise((resolve, reject) => {
  setTimeout(resolve, 3000);
}));

export { doLogin, getTickets };
