import React from 'react';
import './App.css';
import Landing from './screens/Landing.jsx';
import Login from './screens/Login.jsx';
import { BrowserRouter as Switch, Route } from 'react-router-dom';

function App () {
  <Switch>
    <Route path="/login" component={Login}/>
  </Switch>
  const route = window.location.pathname;
  if (route === '/login') {
    return (
      <Login/>
    );
  } else {
    return (
      <Landing/>
    );
  }
}

export default App;
