import http from '../utils/http';

const login = (phone, code) => http.post('/user/login', { phone, code });

const sendCode = phone => http.post('/user/sendCode', { phone });

export default {
  login,
  sendCode,
};
