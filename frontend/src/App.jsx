import React from 'react';
import './App.css';
import './HostedL.css';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Register from './screens/Register';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { StoreContext } from './Store';
import HostedListings from './screens/HostedListings';
import NewListing from './screens/NewListing';
import EditListing from './screens/EditListing';

/* setPage values:
  Landing = setPage(0);
  Login = setPage(1);
  Register = setPage(2);
  HostedListings = setPage(3);
  NewListing = setPage(4);
  EditListing = setPage(5);
*/

function App () {
  <Switch>
    <Route exact path="/" component={Landing}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
    <Route path="/hosted-listings" component={HostedListings}/>
    <Route path="/new-listing" component={NewListing}/>
    <Route path="/edit-listing" component={EditListing}/>
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
  } else if (route === '/hosted-listings') {
    return (
      <HostedListings/>
    );
  } else if (route === '/new-listing') {
    return (
      <NewListing/>
    );
  } else if (route.includes('/edit-listings')) {
    return (
      <EditListing />
    );
  } else {
    console.log(route);
    return (
      <h1>Page Not Found!</h1>
    )
  }
}

export default App;
