import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store.jsx';
import LogoutButton from '../components/LogoutButton.jsx';

function Landing () {
  const { page, token } = React.useContext(StoreContext);

  const LoginStatus = () => {
    if (token.token !== '') {
      return (
        <h1>Logged In</h1>
      );
    } else {
      return (
        <h1>Not Logged In</h1>
      );
    }
  }

  return (
    <>
      <header>
        <div>
        </div>
        <div id="logo">
          <h1>Logo</h1>
        </div>
        <div>
          <LoginStatus/>
          <Router>
            <Link to={'/login'} onClick={() => page.setPage(1)}>
              Login/Register
            </Link>
          </Router>
          <LogoutButton/>
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
