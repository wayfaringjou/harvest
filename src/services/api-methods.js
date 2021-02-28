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

export const collection = ({ path = '' }) => (
  {
    getAll: () => apiRequest(path, composeOptions('GET')),
    getWithQuery: (query = '') => {
      const requestUrl = `${path}${query}`;
      return apiRequest(requestUrl, composeOptions('GET'));
    },
  }
);

export const singleton = ({ path = '', id = '', data = {} }) => (
  {
    getById: () => {
      const requestUrl = `${path}/${id}`;
      return apiRequest(requestUrl, composeOptions('GET'));
    },
    postToPath: () => apiRequest(path, composeOptions('POST', data)),
  }
);
