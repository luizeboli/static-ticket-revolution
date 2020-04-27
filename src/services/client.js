/* eslint-disable consistent-return */
const localStorageKey = 'Token';
const apiUrl = 'https://app.hiplatform.com/agent/ticket/1.0';

function wrapPromise(promise) {
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
}

function logout() {
  window.localStorage.removeItem(localStorageKey);
}

function client(endpoint, { method, body, ...customConfig } = {}) {
  const token = window.localStorage.getItem(localStorageKey);
  const headers = { 'content-type': 'application/json' };
  if (token) {
    headers.Authorization = `DT-Fenix-Token ${token}`;
  }
  const config = {
    method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return (
    window
      .fetch(`${apiUrl}/${endpoint}`, config)
      .then(async (response) => {
        if (response.status === 401) {
          logout();
          window.location.assign(window.location);
          return;
        }
        const data = await response.json();
        if (response.ok) {
          return data;
        }
        return Promise.reject(data);
      }));
}

export { wrapPromise };
export default client;
