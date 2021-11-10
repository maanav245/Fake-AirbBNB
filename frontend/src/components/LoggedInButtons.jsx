import React from 'react';
import { StoreContext } from '../Store';
import LinkButton from './LinkButton'

function LoggedInButtons () {
  const { page, token } = React.useContext(StoreContext);

  if (token.token !== '') {
    return (
      <div className="banner">
        <LinkButton to={'/hosted-listings'} onClick={() => page.setPage(3)} value="Hosted Listings"/>
        <LinkButton to={'/'} onClick={() => page.setPage(0)} value="Listings"/>
      </div>
    );
  } else {
    return (
      <div className="banner"></div>
    );
  }
}

export default LoggedInButtons;
