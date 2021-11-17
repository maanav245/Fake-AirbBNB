import React from 'react';
import { StoreContext } from '../Store';
import { LinkButton } from './LinkButton';
import { Banner } from './StyledComponents';

function LoggedInButtons () {
  const { page, token } = React.useContext(StoreContext);
  if (token.token !== '') {
    return (
      <Banner>
        <LinkButton id={'hostedListingsButton'} to={'/hosted-listings'} onClick={() => page.setPage(3)} value="Hosted Listings"/>
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
