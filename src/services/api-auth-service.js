import config from '../config/api';
import { apiSingleton } from './api-methods';

const loginPath = `${config.AUTH_BASEPATH}/login`;
const newUserPath = `${config.AUTH_BASEPATH}`;

const credentials = ({ user_name = '', password = '' } = {}) => {
  const data = {
    user_name,
    password,
    path: loginPath,
  };
  return ({
    getToken: () => apiSingleton({ data }).post(),
    postNewUser: () => apiSingleton({ data: { ...data, path: newUserPath } }).post(),
  });
};
export default credentials;
