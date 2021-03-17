import React from 'react';
import useAuthContext from '../../../hooks/useAuthContext';

const RegistrationForm = () => {
  const {
    addNewUser,
    setUserName,
    setPassword,
    authStatus,
  } = useAuthContext();

  if (authStatus.isSubmitting) return <p>Signing up...</p>;

  return (
    <form onSubmit={(e) => addNewUser(e)}>
      <fieldset className="registration-fieldset">
        <legend><h2>Sign up</h2></legend>
        {authStatus.submitError && (
        <p>
          There was an error:
          {' '}
          {authStatus.submitError}
        </p>
        )}
        <label htmlFor="username-input">
          <p>User name:</p>
          <input
            id="username-input"
            type="text"
            onChange={({ target: { value } }) => setUserName(value)}
          />
        </label>
        <label htmlFor="password-input">
          <p>Password:</p>
          <input
            id="password-input"
            type="password"
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </label>
        <button type="submit">
          Sign up
        </button>
      </fieldset>

    </form>
  );
};

export default RegistrationForm;
