import React from 'react';
import { Link } from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext';
import logo from '../../../images/logo.svg';
import './Header.css';

const Header = () => {
  // eslint-disable-next-line no-unused-vars
  const { isAuthenticated, logout } = useAuthContext();
  return (
    <header>
      <h2 className="logotype">
        <img src={logo} alt="Sprig" />
        Harvest
      </h2>
      {isAuthenticated && (
      <Link
        to="/"
        onClick={() => logout()}
      >
        Log out
      </Link>
      )}
    </header>
  );
};

export default Header;
