import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store';
import Port from '../config.json';
import Error from '../Error';

function LogoutButton () {
  const { page, token, modal } = React.useContext(StoreContext);

  const logoutUser = () => {
    fetch(`http://localhost:${Port.BACKEND_PORT}/user/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token.token,
      },
    }).then((response) => {
      if (response.ok) {
        token.setToken('');
      } else {
        Error(response.json(), modal);
      }
    }).catch((e) => Error(e, modal));
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
