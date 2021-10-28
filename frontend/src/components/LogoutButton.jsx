import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store';
import Port from '../config.json';
import Error from '../Error';

function LogoutButton () {
  const { page, token, modal } = React.useContext(StoreContext);

  async function logoutUser () {
    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/user/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
    });
    const json = await response.json();
    if (response.ok) {
      token.setToken('');
    } else {
      Error(json.error, modal);
    }
    page.setPage(0);
  }

  return (
    <Router>
      <Link className="button" to={'/'} onClick={logoutUser}>
        Logout
      </Link>
    </Router>
  );
}

export default LogoutButton;
