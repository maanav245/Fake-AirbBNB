import React from 'react';
import { StoreContext } from '../Store';
import Port from '../config.json';
import Error from '../Error';
import Modal from '../components/Modal';
import LoggedInButtons from '../components/LoggedInButtons';
import LinkButton from '../components/LinkButton'
import Logo from '../components/Logo'
import { StyledSection, StyledHeader, StyledMain, StyledForm, StyledInput, Banner } from '../components/StyledComponents'

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
        StyledHeaders: {
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
    <StyledSection>
      <Modal/>
      <StyledHeader>
        <LoggedInButtons/>
        <Banner>
          <Logo/>
        </Banner>
        <Banner>
        </Banner>
      </StyledHeader>
      <StyledMain>
        <h1>Register</h1>
        <StyledForm>
          <div className="registerInput">
            <label htmlFor="registerName">Your Name:</label>
            <StyledInput id="registerName" type="text" onChange={({ target }) => setName(target.value)} placeholder="John Smith"/>
          </div>
          <div className="registerInput">
            <label htmlFor="registerEmail">Email Address:</label>
            <StyledInput id="registerEmail" type="email" onChange={({ target }) => setEmail(target.value)} placeholder="example@email.com"/>
          </div>
          <div className="registerInput">
            <label htmlFor="registerPassword1">Password:</label>
            <StyledInput id="registerPassword1" type="password" onChange={({ target }) => setPassword1(target.value)} placeholder="password"/>
          </div>
          <div className="registerInput">
            <label htmlFor="registerPassword2">Confirm Password:</label>
            <StyledInput id="registerPassword2" type="password" onChange={({ target }) => setPassword2(target.value)} placeholder="password"/>
          </div>
        </StyledForm>
        <LinkButton to={'/'} onClick={registerUser} value="Register"/>
        <LinkButton to={'/login'} onClick={() => page.setPage(1)} value="Back"/>
      </StyledMain>
      <footer>
      </footer>
    </StyledSection>
  );
}

export default Register;
