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

const composeOptions = (method, body) => ({
  method,
  headers: {
    'content-type': 'application/json',
  },
  body: body && JSON.stringify(body),
});

const gbifBaseUrl = 'https://api.gbif.org/v1';

export const gbifCollection = (gbifBase = gbifBaseUrl) => (
  {
    searchByScientificName: async (query = '') => {
      const requestUrl = `${gbifBase}/species/match?name=${query}`;
      return apiRequest(requestUrl, composeOptions('GET'));
    },
  }
);

export const gbifSingleton = ({ speciesKey = '' } = {}, gbifBase = gbifBaseUrl) => ({
  getImages: async () => {
    const requestUrl = `${gbifBase}/occurrence/search?advanced=true&limit=10&locale=en&mediaType=stillImage&offset=0&taxon_key=${speciesKey}`;
    return apiRequest(requestUrl, composeOptions('GET'));
  },
});
