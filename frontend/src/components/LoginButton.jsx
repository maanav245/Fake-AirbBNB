import React from 'react';
import { StoreContext } from '../Store';
import LogoutButton from './LogoutButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkButton } from './LinkButton';
import { Banner } from './StyledComponents';

function LoginButton () {
  const { page, token } = React.useContext(StoreContext);

  if (token.token === '') {
    return (
      <Banner>
        <LinkButton to={'/login'} onClick={() => page.setPage(1)} value="Login/Register"/>
      </Banner>
    );
  } else {
    return (
      <Banner>
        <LogoutButton/>
      </Banner>
    );
  }
}

export default LoginButton;
