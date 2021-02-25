// import config from './config';
import useAPIRequest from './useAPIRequest';

const options = (method, body) => ({
  method,
  headers: {
    'content-type': 'application/json',
  },
  body: body && JSON.stringify(body),
});
// const areasEndpoint = `${config.API_BASEPATH}/garden/areas`;

const AreasAPIService = {
  postArea(url, data, errorHandler) {
    const apiRes = useAPIRequest(url, options('POST', data));
    if (apiRes.error) {
      errorHandler(apiRes.error);
      return;
    }
    // eslint-disable-next-line consistent-return
    return apiRes;
  },
};

export default AreasAPIService;
