import React from 'react';
import './App.css';
import Landing from './screens/Landing.jsx';
import Login from './screens/Login.jsx';
import Register from './screens/Register.jsx';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { StoreContext } from './Store.jsx';

function App () {
  <Switch>
    <Route exact path="/" component={Landing}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
  </Switch>

  React.useContext(StoreContext);
  const route = window.location.pathname;
  if (route === '/') {
    return (
      <Landing/>
    );
  } else if (route === '/login') {
    return (
      <Login/>
    );
  } else if (route === '/register') {
    return (
      <Register/>
    );
  } else {
    return (
      <h1>Page Not Found!</h1>
    )
  }
}

export default App;
