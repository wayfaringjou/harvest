import React from 'react';
import PropTypes from 'prop-types';
import useAuthContext from '../../../hooks/useAuthContext';
import './LoginForm.css';

const LoginForm = ({ onCancel }) => {
  const {
    login,
    setUserName,
    setPassword,
    authStatus,
  } = useAuthContext();

  if (authStatus.isSubmitting) return <p>Signing in...</p>;

  return (
    <form onSubmit={(e) => login(e)}>
      <fieldset className="flow-all">
        <legend>
          <h2>Sign in</h2>
        </legend>
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
          <span className="btn-label">
            Sign in
          </span>
        </button>
        <button
          className="text"
          type="button"
          onClick={onCancel}
        >
          <span className="btn-label">
            Cancel
          </span>
        </button>
      </fieldset>
    </form>
  );
};

LoginForm.propTypes = {
  onCancel: PropTypes.func,
};

LoginForm.defaultProps = {
  onCancel: () => {},
};
export default LoginForm;
