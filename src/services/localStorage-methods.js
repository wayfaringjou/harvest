export default (key) => ({
  getItem: () => JSON.parse(window.localStorage.getItem(key)),
  setItem: (data) => window.localStorage.setItem(key, JSON.stringify(data)),
  removeItem: () => window.localStorage.removeItem(key),
});
