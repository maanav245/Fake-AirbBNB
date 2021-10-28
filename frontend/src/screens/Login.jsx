import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store';
import Port from '../config.json';
import Error from '../Error';
import Modal from '../components/Modal';
import LoggedInButtons from '../components/LoggedInButtons';

function Login () {
  const { page, token, modal, users, user } = React.useContext(StoreContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function loginUser () {
    const data = { email: email, password: password };

    const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/user/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    if (response.ok) {
      token.setToken('Bearer ' + json.token)
      getUser();
    } else {
      Error(json.error, modal);
    }
    page.setPage(0);
  }

  const getUser = () => {
    for (let i = 0; i < users.users.length; i++) {
      if (users.users[i].email === email) {
        user.setUser(users.users[i].name);
      }
    }
  };

  return (
    <section>
      <Modal/>
      <header>
        <LoggedInButtons/>
        <div className="banner">
          <div id="logo">
            AirBrb
          </div>
        </div>
        <div className="banner">
        </div>
      </header>
      <main>
      <h1>Login Page</h1>
        <form>
          <input className="input" type="email" onChange={({ target }) => setEmail(target.value)} placeholder="Email Address"/>
          <input className="input" type="password" onChange={({ target }) => setPassword(target.value)} placeholder="Password"/>
        </form>
        <Router>
          <Link className="button" to={'/'} onClick={loginUser}>
            Login
          </Link>
          <Link className="button" to={'/register'} onClick={() => page.setPage(2)}>
            Register
          </Link>
          <Link className="button" to={'/'} onClick={() => page.setPage(0)}>
            Back
          </Link>
        </Router>
      </main>
      <footer>
      </footer>
    </section>
  );
}

export default Login;
