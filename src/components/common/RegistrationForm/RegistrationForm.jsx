import React from 'react';
import PropTypes from 'prop-types';
import useAuthContext from '../../../hooks/useAuthContext';
import './RegistrationForm.css';

const RegistrationForm = ({ onCancel }) => {
  const {
    addNewUser,
    setUserName,
    setPassword,
    authStatus,
  } = useAuthContext();

  if (authStatus.isSubmitting) return <p>Signing up...</p>;

  return (
    <form onSubmit={(e) => addNewUser(e)}>
      <fieldset className="registration-fieldset flow-all">
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

RegistrationForm.propTypes = {
  onCancel: PropTypes.func,
};

RegistrationForm.defaultProps = {
  onCancel: () => {},
};

export default RegistrationForm;
