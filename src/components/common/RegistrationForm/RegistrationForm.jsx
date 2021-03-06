import React, { useState } from 'react';
import FH from '../../../handlers/form-handlers';

const RegistrationForm = () => {
  // const [userName, setUserName] = useState('');
  // const [passWord, setPassword] = useState('');
  const [formState, setFromState] = useState({
    username: '',
    password: '',
    ...FH,
  });

  formState.test();

  function logme(e) {
    console.log(e);
  }
  return (
    <form>
      <label htmlFor="username-input">
        <p>User name:</p>
        <input
          id="username-input"
          type="text"
          onChange={(e) => formState.handleChange(e, 'username', setFromState)}
        />
      </label>
      <label htmlFor="password-input">
        <p>Password:</p>
        <input
          id="password-input"
          type="text"
          onChange={logme}
        />
      </label>
    </form>
  );
};

export default RegistrationForm;
