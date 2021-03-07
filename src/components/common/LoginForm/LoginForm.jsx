import React from 'react';
import useAuthContext from '../../../hooks/useAuthContext';

const LoginForm = () => {
  const {
    login,
    setUserName,
    setPassword,
    authStatus,
  } = useAuthContext();

  if (authStatus.isSubmitting) return <p>Signing in...</p>;

  return (
    <form onSubmit={(e) => login(e)}>
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
          type="text"
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </label>
      <button type="submit">
        Login
      </button>
    </form>

  );
};
export default LoginForm;
