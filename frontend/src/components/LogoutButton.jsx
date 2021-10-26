import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store.jsx';
import Port from '../config.json';
import Error from '../Error.jsx';

function LogoutButton () {
  const { page, token } = React.useContext(StoreContext);

  const logoutUser = () => {
    fetch(`http://localhost:${Port.BACKEND_PORT}/user/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: token.token,
      },
    }).then((response) => {
      if (response.ok) {
        page.setPage(0);
        token.setToken('');
      } else {
        Error('Not logged in');
      }
    }).catch((error) => Error(error));
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
