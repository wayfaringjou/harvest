import config from '../config/api';
import { apiSingleton } from './api-methods';

console.log(apiSingleton);
// const { post } = apiSingleton();
// console.log(post);
const loginPath = `${config.AUTH_BASEPATH}/login`;

const credentials = ({ user_name = '', password = '' } = {}) => {
  const data = {
    user_name,
    password,
    path: loginPath,
  };

  return ({
    getToken: () => apiSingleton({ data }).post(),
  });
};
console.log(credentials());
export default credentials;
