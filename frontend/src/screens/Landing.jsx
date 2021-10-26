import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store.jsx';

function Button () {
  const { page } = React.useContext(StoreContext);

  const setPage = page[1];

  return (
    <Router>
      <Link to={'./login'} onClick={() => setPage(1)}>
        Login/Register
      </Link>
    </Router>
  );
}

function Landing () {
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
          <Button/>
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
