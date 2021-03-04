/* eslint-disable no-param-reassign */
const composeOptions = (method, body) => ({
  method,
  headers: {
    'content-type': 'application/json',
  },
  body: body && JSON.stringify(body),
});

const apiRequest = async (url = '', options = {}) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
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
      const requestUrl = `${path}${query}`;
      return apiRequest(requestUrl, composeOptions('GET'));
    },
  }
);

export const apiSingleton = ({ data = {} }) => ({
  getById: (queryId = '') => {
    const requestUrl = `${data.path}/${queryId}`;
    return apiRequest(requestUrl, composeOptions('GET'));
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
