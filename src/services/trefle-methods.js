import config from '../config/api';
import localStorage from './localStorage-methods';

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
const ls = localStorage(config.TREFLE_KEY);

// eslint-disable-next-line consistent-return
const trefleToken = async () => {
  // Check if token has been stored
  if (ls.getItem()) {
    const tokenExpiration = ls.decodeUserData().exp;
    const now = Math.floor(Date.now() / 1000);
    // Check that token is still valid
    const validity = ((tokenExpiration - now) > 0);
    if (validity) {
      // If stored and hasn't expired, return token from storage
      return ls.getItem();
    }
  }
  // If token isn't stored or is expired fetch a new one
  const res = await apiRequest(
    `${config.AUTH_BASEPATH}/trefle`,
    { method: 'Get' },
  );
  // Save new token in storage
  ls.setItem(res.data.token);
  // Return from storage
  return ls.getItem();
};

const composeOptions = (method, token, body) => ({
  method,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Origin': config.CLIENT_ORIGIN,
  },
  body: body && JSON.stringify(body),
});

const trefleBaseUrl = 'https://trefle.io/api/v1';

export const trefleCollection = ({ trefleBase = trefleBaseUrl } = {}) => (
  {
    searchPlantsData: async (query = '') => {
      const requestUrl = `${trefleBase}/plants/search?q=${query}`;
      const token = await trefleToken();
      return apiRequest(requestUrl, composeOptions('GET', token));
    },
  }
);

export const trefleSingleton = ({ trefleBase = trefleBaseUrl } = {}) => ({
  getDataWithPath: async (path = '') => {
    const requestUrl = `${trefleBase}${path.replace('/api/v1', '')}`;
    const token = await trefleToken();
    return apiRequest(requestUrl, composeOptions('GET', token));
  },
});
