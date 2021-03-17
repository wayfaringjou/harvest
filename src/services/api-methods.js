/* eslint-disable no-param-reassign */
import localStorage from './localStorage-methods';
import config from '../config/api';

const ls = localStorage(config.AUTH_TOKEN_KEY);

const composeOptions = (method, body) => ({
  method,
  headers: {
    'content-type': 'application/json',
    authorization: `bearer ${ls.getItem()}`,
  },
  body: body && JSON.stringify(body),
});

const apiRequest = async (url = '', options = {}) => {
  try {
    if (!url) throw new Error('Empty url in fetch request');
    const res = await fetch(url, options);
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    const data = await res.json();
    return { data, error: false };
  } catch (error) {
    return { data: error.message, error: true };
  }
};

export const apiCollection = ({ path = '' }) => (
  {
    getAll: () => apiRequest(path, composeOptions('GET')),
    getWithQuery: (query = '') => {
      const requestUrl = `${path}?${query}`;
      return apiRequest(requestUrl, composeOptions('GET'));
    },
  }
);

export const apiSingleton = ({ data = {} }) => ({
  getFromPath: () => apiRequest(data.path, composeOptions('GET')),
  getById: (id = '') => {
    const requestUrl = `${data.path}/${id}`;
    return apiRequest(requestUrl, composeOptions('GET'));
  },
  getWithQuery: (query = '') => {
    const request = `${data.path}?${query}`;
    return apiRequest(request, composeOptions('GET'));
  },
  post: () => apiRequest(data.path, composeOptions('POST', data)),
  patch: () => {
    const patchData = Object.keys(data)
      .reduce((acc, key) => {
        if (data[key] && key !== 'path' && key !== 'id') {
          acc[key] = data[key];
          return acc;
        }
        return acc;
      }, {});
    return apiRequest(`${data.path}/${data.id}`, composeOptions('PATCH', patchData));
  },
  delete: () => apiRequest(`${data.path}/${data.id}`, composeOptions('DELETE')),
});
