import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store.jsx';
import LogoutButton from '../components/LogoutButton.jsx';

function Landing () {
  const { page, token } = React.useContext(StoreContext);

  const LoginStatus = () => {
    if (token.token !== '') {
      return (
        <h2>Logged In</h2>
      );
    } else {
      return (
        <h2>Not Logged In</h2>
      );
    }
  }

  return (
    <section>
      <header>
        <div>
          <LogoutButton/>
        </div>
        <div id="logo">
          AirBrb
        </div>
        <div>
          <Router>
            <Link className="button" to={'/login'} onClick={() => page.setPage(1)}>
              Login/Register
            </Link>
          </Router>
        </div>
      </header>
      <main>
        <LoginStatus/>
      </main>
      <footer>
      </footer>
    </section>
  );
}

export default Landing;
