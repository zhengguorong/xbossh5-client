import axios from 'axios';
import appConst from './appConst';

const errorHandler = (err) => {
  if (err.response.status === 401) {
    window.location.href = '#/login';
  }
};

const request = (url, params, method) => {
  const token = `Bearer ${window.localStorage.token}`;
  return axios({
    method,
    url: `${appConst.BACKEND_DOMAIN}${url}`,
    data: params,
    headers: { authorization: token },
  })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      }
      return Promise.reject(res);
    })
    .catch((err) => {
      errorHandler(err);
      return Promise.reject(err);
    });
};

const get = (url, params) => request(url, params, 'get');

const post = (url, params) => request(url, params, 'post');

export default {
  get,
  post,
};
