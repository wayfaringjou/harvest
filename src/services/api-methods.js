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

export const apiSingleton = ({ data = {} }) => {
  console.log(data);
  return {
    getById: (queryId = '') => {
      const requestUrl = `${data.path}/${queryId}`;
      return apiRequest(requestUrl, composeOptions('GET'));
    },
    post: () => apiRequest(data.path, composeOptions('POST', data)),
    updateWithId: (queryId = '') => console.log(queryId, data),
  };
};
