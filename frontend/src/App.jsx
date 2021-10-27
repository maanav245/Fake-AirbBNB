import React from 'react';
import './App.css';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Register from './screens/Register';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { StoreContext } from './Store';

/* setPage values:
  Landing = setPage(0);
  Login = setPage(1);
  Register = setPage(2);
  ViewAllListings = setPage(3);
  ViewHostedListings = setPage(4);
*/

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
