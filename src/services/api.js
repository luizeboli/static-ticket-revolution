import axios from 'axios';

const api = axios.create({ baseURL: 'https://app.hiplatform.com/agent/ticket/1.0' });

const doLogin = async (us, pw) => {
  const auth = window.btoa(`${us}:${pw}`);

  return api.post('/Login', null, {
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
  });
};

export { doLogin };
