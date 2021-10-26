import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store.jsx';
import Port from '../config.json';

function Register () {
  const { page } = React.useContext(StoreContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  const registerUser = (event) => {
    event.preventDefault();

    if (password1 !== password2) {
      alert('passwords do not match');
    } else {
      const data = { email: email, password: password1, name: name };

      fetch(`http://localhost:${Port.BACKEND_PORT}/user/auth/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify(data)
      }).then((response) => {
        if (response.ok) {
          alert('registered');
        } else {
          alert('error');
        }
      }).catch((error) => console.log(error));
    }
  }

  return (
    <section>
      <header>
        <h1>Register Page</h1>
      </header>
      <main>
        <form>
          <input className="input" type="text" onChange={({ target }) => setName(target.value)} placeholder="Your Name"/>
          <input className="input" type="email" onChange={({ target }) => setEmail(target.value)} placeholder="Email Address"/>
          <input className="input" type="password" onChange={({ target }) => setPassword1(target.value)} placeholder="Password"/>
          <input className="input" type="password" onChange={({ target }) => setPassword2(target.value)} placeholder="Confirm Password"/>
          <input className="button" type="submit" value="Register" onClick={(event) => registerUser(event)}/>
        </form>
        <Router>
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
