import React from 'react';
import { StoreContext } from '../Store';
import LogoutButton from './LogoutButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import LinkButton from './LinkButton'

function LoginButton () {
  const { page, token } = React.useContext(StoreContext);

  if (token.token === '') {
    return (
      <div className="banner">
        <LinkButton to={'/login'} onClick={() => page.setPage(1)} value="Login/Register"/>
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
