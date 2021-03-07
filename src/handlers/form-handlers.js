const FH = {
  handleChange({ target: { value } }, key, callback) {
    callback({ ...this, [key]: value });
  },
  test() { console.log(this); },
};

export default FH;
