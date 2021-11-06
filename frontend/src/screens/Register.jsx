import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store';
import Port from '../config.json';
import Error from '../Error';
import Modal from '../components/Modal';
import LoggedInButtons from '../components/LoggedInButtons';

function Register () {
  const { page, token, modal, users, user } = React.useContext(StoreContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  React.useEffect(() => {
    console.log(users.users);
    localStorage.setItem('users', JSON.stringify(users.users));
  }, [users]);

  async function registerUser () {
    if (password1 !== password2) {
      Error('Passwords do not match!', modal);
    } else if (email === '' || password1 === '' || password2 === '' || name === '') {
      Error('You must complete all fields!', modal);
    } else {
      const data = { email: email, password: password1, name: name };

      const response = await fetch(`http://localhost:${Port.BACKEND_PORT}/user/auth/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if (response.ok) {
        token.setToken('Bearer ' + json.token);
        users.setUsers([{ name: name, email: email }]);
        user.setUser(email);
      } else {
        Error(json.error, modal);
      }
    }
    page.setPage(0);
  }

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
        <h1>Register</h1>
        <form>
          <input className="input" type="text" onChange={({ target }) => setName(target.value)} placeholder="Your Name"/>
          <input className="input" type="email" onChange={({ target }) => setEmail(target.value)} placeholder="Email Address"/>
          <input className="input" type="password" onChange={({ target }) => setPassword1(target.value)} placeholder="Password"/>
          <input className="input" type="password" onChange={({ target }) => setPassword2(target.value)} placeholder="Confirm Password"/>
        </form>
        <Router>
          <Link className="button" to={'/'} onClick={registerUser}>
            Register
          </Link>
          <Link className="button" to={'/login'} onClick={() => page.setPage(1)}>
            Back
          </Link>
        </Router>
      </main>
      <footer>
      </footer>
    </section>
  );
}

export default Register;
