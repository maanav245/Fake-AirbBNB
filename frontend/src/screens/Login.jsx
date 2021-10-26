import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store.jsx';
import Port from '../config.json';

function Login () {
  const { page, token } = React.useContext(StoreContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginUser = (event) => {
    event.preventDefault();

    const data = { email: email, password: password };

    fetch(`http://localhost:${Port.BACKEND_PORT}/user/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        alert('logged in');
        updateToken(response.json());
      } else {
        alert('error');
      }
    }).catch((error) => console.log(error));
  }

  const updateToken = (response) => {
    response.then((data) => token.setToken('Bearer ' + data.token));
  }

  return (
    <>
    <h1>Login Page</h1>
    <form>
      <input type="email" onChange={({ target }) => setEmail(target.value)} placeholder="Email Address"/>
      <input type="password" onChange={({ target }) => setPassword(target.value)} placeholder="Password"/>
      <input type="submit" value="Login" onClick={(event) => loginUser(event)}/>
    </form>
    <Router>
      <Link to={'/register'} onClick={() => page.setPage(2)}>
        Register
      </Link>
      <Link to={'/'} onClick={() => page.setPage(2)}>
        Back
      </Link>
    </Router>
    </>
  );
}

export default Login;
