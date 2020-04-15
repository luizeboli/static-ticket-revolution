import axios from 'axios';

const api = axios.create({ baseURL: 'https://app.hiplatform.com/agent/ticket/1.0' });

export default api;
