import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store.jsx';
import Port from '../config.json';

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
        alert('logged out');
        page.setPage(0);
        token.setToken('');
      } else {
        alert('error');
      }
    }).catch((error) => console.log(error));
  }

  return (
    <Router>
      <Link to={'/'} onClick={logoutUser}>
        Logout
      </Link>
    </Router>
  );
}

export default LogoutButton;
