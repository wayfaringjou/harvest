// const token = process.env.REACT_APP_TREFLE_TOKEN;
import config from '../config/api';

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

const trefleToken = async () => {
  const res = await apiRequest(
    `${config.AUTH_BASEPATH}/trefle`,
    { method: 'Get' },
  );
  console.log(res);
  return res.data.token;
};

const composeOptions = (method, token, body) => ({
  method,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
  body: body && JSON.stringify(body),
});

const trefleBaseUrl = 'https://trefle.io/api/v1';

export const trefleCollection = ({ trefleBase = trefleBaseUrl } = {}) => (
  {
    searchPlantsData: async (query = '') => {
      const requestUrl = `${trefleBase}/plants/search?q=${query}`;
      const token = await trefleToken();
      console.log(`using ${token}`);
      return apiRequest(requestUrl, composeOptions('GET', token));
    },
  }
);

export const trefleSingleton = () => ({});
