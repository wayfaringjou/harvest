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
  async postArea(url, data, errorHandler) {
    const apiRes = await useAPIRequest(url, options('POST', data));
    console.log(apiRes);
    if (apiRes.error) {
      console.log('Error so passing to handler');
      errorHandler(apiRes.error);
      return;
    }
    // eslint-disable-next-line consistent-return
    return apiRes;
  },
};

export default AreasAPIService;
