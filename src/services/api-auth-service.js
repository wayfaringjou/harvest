import config from '../config/api';
import { apiSingleton } from './api-methods';

// console.log(apiSingleton);
// const { post } = apiSingleton();
// console.log(post);
const loginPath = `${config.AUTH_BASEPATH}/login`;
const newUserPath = `${config.AUTH_BASEPATH}`;

const credentials = ({ user_name = '', password = '' } = {}) => {
  const data = {
    user_name,
    password,
    path: loginPath,
  };
  // console.log(newUserPath);
  // console.log(data);
  return ({
    getToken: () => apiSingleton({ data }).post(),
    postNewUser: () => apiSingleton({ data: { ...data, path: newUserPath } }).post(),
  });
};
// console.log(credentials());
export default credentials;
