import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store';
import LogoutButton from './LogoutButton';

function LoginButton () {
  const { page, token } = React.useContext(StoreContext);

  if (token.token === '') {
    return (
      <div className="banner">
        <Router>
          <Link className="button" to={'/login'} onClick={() => page.setPage(1)}>
            Login/Register
          </Link>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="banner">
        <LogoutButton/>
      </div>
    );
  }
}

export default LoginButton;
