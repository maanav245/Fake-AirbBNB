import React from 'react';
import { StoreContext } from '../Store';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function LoggedInButtons () {
  const { page, token } = React.useContext(StoreContext);

  if (token.token !== '') {
    return (
      <div className="banner">
        <Router>
          <Link className="button" to={'/hosted-listings'} onClick={() => page.setPage(3)}>
            Hosted Listings
          </Link>
          <Link className="button" to={'/'} onClick={() => page.setPage(0)}>
            Listings
          </Link>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="banner"></div>
    );
  }
}

export default LoggedInButtons;
