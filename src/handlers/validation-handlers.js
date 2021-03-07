// String will be stored in state directly or inside object

// The username shouldn't already be taken, it should be unique.
// The username shouldn't start with or end with spaces.

// The password should be 8 or more characters long for better security.
// The password shouldn't start with or end with spaces.
// We'll use bcrypt to store the password, but bcrypt is sometimes restricted
// to 72 characters so the password shouldn't be longer than that.
// The password would be stronger if it contained at least 1 upper case
// letter, 1 lower case letter, 1 number, and 1 special character.
// The full_name will be required and the nickname can be optional.

const registrationValidation = () => ({
  validatePassword({ traget: { value } }) {
    console.log;
  },
});
