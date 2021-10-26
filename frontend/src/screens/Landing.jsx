import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store.jsx';

function Landing () {
  const { page } = React.useContext(StoreContext);
  return (
    <>
      <header>
        <div>
        </div>
        <div id="logo">
          <h1>Logo</h1>
        </div>
        <div>
          <h1>Login Area</h1>
          <Router>
            <Link to={'/login'} onClick={() => page.setPage(1)}>
              Login/Register
            </Link>
          </Router>
        </div>
      </header>
      <main>
      </main>
      <footer>
      </footer>
    </>
  );
}

export default Landing;
