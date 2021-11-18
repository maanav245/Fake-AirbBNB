import React from 'react';
import { StoreContext } from '../Store';
import { LinkButton } from './LinkButton';
import { Banner } from './StyledComponents';

/*
Component used to describe the logged in buttons that appear in the banner at the top of the page. They only appear if
the user is logged in.
*/

function LoggedInButtons () {
  const { page, token } = React.useContext(StoreContext);
  if (token.token !== '') {
    return (
      <Banner>
        <LinkButton to={'/hosted-listings'} onClick={() => page.setPage(3)} value="Hosted Listings"/>
        <LinkButton to={'/'} onClick={() => page.setPage(0)} value="Listings"/>
      </Banner>
    );
  } else {
    return (
      <Banner>
      </Banner>
    );
  }
}

export default LoggedInButtons;
