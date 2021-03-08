const config = {
  API_BASEPATH: 'http://localhost:5000/api',
  AUTH_BASEPATH: 'http://localhost:5000/auth',
  API_USERPATH: (logedUser) => `/users/${logedUser.user_id}`,
  AUTH_TOKEN_KEY: 'harvest-token',
};

export default config;
