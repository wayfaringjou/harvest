const config = {
  API_BASEPATH: process.env.REACT_APP_API_BASEPATH,
  AUTH_BASEPATH: process.env.REACT_APP_AUTH_BASEPATH,
  API_USERPATH: (logedUser) => `/users/${logedUser.user_id}`,
  AUTH_TOKEN_KEY: process.env.REACT_APP_AUTH_TOKEN_KEY,
  TREFLE_KEY: process.env.REACT_APP_TREFLE_KEY,
  CLIENT_ORIGIN: process.env.REACT_APP_CLIENT_ORIGIN,
};

export default config;
