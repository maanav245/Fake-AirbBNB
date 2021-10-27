import React from 'react';
import { StoreContext } from '../Store';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function LoggedInButtons () {
  const { page, token } = React.useContext(StoreContext);

  if (token.token !== '') {
    return (
      <div className="banner">
        <Router>
          <Link className="button" to={'/allListings'} onClick={() => page.setPage(3)}>
            Listings
          </Link>
          <Link className="button" to={'/allHostedListings'} onClick={() => page.setPage(4)}>
            Hosted Listings
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
