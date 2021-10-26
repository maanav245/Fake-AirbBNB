import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store.jsx';
import Port from '../config.json';
import Error from '../Error.jsx';
import Modal from '../components/Modal.jsx';

function Login () {
  const { page, token, modal } = React.useContext(StoreContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginUser = (event) => {
    event.preventDefault();

    const data = { email: email, password: password };

    fetch(`http://localhost:${Port.BACKEND_PORT}/user/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        console.log('logged in');
        updateToken(response.json());
      } else {
        Error(response.json(), modal);
      }
    }).catch((e) => Error(e), modal);
  }

  const updateToken = (response) => {
    response.then((data) => token.setToken('Bearer ' + data.token));
  }

  return (
    <section>
      <Modal/>
      <header>
        <h1>Login Page</h1>
      </header>
      <main>
        <form>
          <input className="input" type="email" onChange={({ target }) => setEmail(target.value)} placeholder="Email Address"/>
          <input className="input" type="password" onChange={({ target }) => setPassword(target.value)} placeholder="Password"/>
          <input className="button" type="submit" value="Login" onClick={(event) => loginUser(event)}/>
        </form>
        <Router>
          <Link className="button" to={'/register'} onClick={() => page.setPage(2)}>
            Register
          </Link>
          <Link className="button" to={'/'} onClick={() => page.setPage(2)}>
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
