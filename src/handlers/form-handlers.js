const FH = {
  handleChange: ({ target: { value } }, key, state, callback) => {
    callback({ ...state, [key]: value });
  },
};

export default FH;
