import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { StoreContext } from '../Store.jsx';
import Port from '../config.json';

const registerUser = (event, name, email, password1, password2) => {
  event.preventDefault();

  if (password1 !== password2) {
    alert('passwords do not match');
  } else {
    const data = { email: email, password: password1, name: name };

    fetch(`http://localhost:${Port.BACKEND_PORT}/user/auth/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

function Register () {
  const { page } = React.useContext(StoreContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  return (
    <>
    <h1>Register Page</h1>
    <form>
      <input type="text" onChange={({ target }) => setName(target.value)} placeholder="Your Name"/>
      <input type="email" onChange={({ target }) => setEmail(target.value)} placeholder="Email Address"/>
      <input type="password" onChange={({ target }) => setPassword1(target.value)} placeholder="Password"/>
      <input type="password" onChange={({ target }) => setPassword2(target.value)} placeholder="Confirm Password"/>
      <input type="submit" value="Login" onClick={(event) => registerUser(event, name, email, password1, password2)}/>
    </form>
    <Router>
      <Link to={'/login'} onClick={() => page.setPage(1)}>
        Back
      </Link>
    </Router>
    </>
  );
}

export default Register;
