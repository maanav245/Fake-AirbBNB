import React from 'react';
import { StoreContext } from '../Store';
import Port from '../config.json';
import Error from '../Error';
import Modal from '../components/Modal';
import LoggedInButtons from '../components/LoggedInButtons';
import { LinkButton } from '../components/LinkButton'
import Logo from '../components/Logo'
import { StyledSection, StyledHeader, StyledMain, StyledForm, StyledInput, Banner } from '../components/StyledComponents'

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
      user.setUser(email)
      console.log(token);
      getUser();
    } else {
      Error(json.error, modal);
    }
    page.setPage(0);
  }

  const getUser = () => {
    for (let i = 0; i < users.length; i++) {
      if (users.users[i].email === email) {
        console.log('here');
        console.log(users.users[i].name);
        user.setUser(users.users[i].name);
      }
    }
  };

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
      <h1>Login Page</h1>
        <StyledForm>
          <div className="loginInput">
            <label htmlFor="loginEmail">Email Address:</label>
            <StyledInput id="loginEmail" type="email" onChange={({ target }) => setEmail(target.value)} placeholder="example@email.com"/>
          </div>
          <div className="loginInput">
            <label htmlFor="loginPassword">Password:</label>
            <StyledInput id="loginPassword" type="password" onChange={({ target }) => setPassword(target.value)} placeholder="password"/>
          </div>
        </StyledForm>
        <LinkButton to={'/'} onClick={loginUser} value="Login"/>
        <LinkButton to={'/register'} onClick={() => page.setPage(2)} value="Register"/>
        <LinkButton to={'/'} onClick={() => page.setPage(0)} value="Back"/>
      </StyledMain>
      <footer>
      </footer>
    </StyledSection>
  );
}

export default Login;
