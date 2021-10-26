import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function Button () {
  return (
    <Router>
      <Link to={'./login'}>
        Login/Register
      </Link>
    </Router>
  );
}

export default function Landing () {
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
