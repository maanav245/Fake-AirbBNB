import React from 'react';
import { StoreContext } from '../Store';
import Port from '../config.json';
import Error from '../Error';
import LinkButton from './LinkButton'

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
    <LinkButton to={'/'} onClick={logoutUser} value="Logout"/>
  );
}

export default LogoutButton;
