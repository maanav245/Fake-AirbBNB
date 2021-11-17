import React from 'react';
import './App.css';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Register from './screens/Register';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { StoreContext } from './Store';
import HostedListings from './screens/HostedListings';
import NewListing from './screens/NewListing';
import EditListing from './screens/EditListing';
import ViewListing from './screens/ViewListing';
import ViewBookings from './screens/ViewBookings';

/* setPage values:
  Landing = setPage(0);
  Login = setPage(1);
  Register = setPage(2);
  HostedListings = setPage(3);
  NewListing = setPage(4);
  EditListing = setPage(5);
  view/Book Listing = setPage(6);
  viewBookings = setPage(7);
*/

function App () {
  <Switch>
    <Route exact path="/" component={Landing}/>
    <Route path="/listings" component={Landing}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
    <Route path="/hosted-listings" component={HostedListings}/>
    <Route path="/new-listing" component={NewListing}/>
    <Route path="/edit-listing" component={EditListing}/>
    <Route path="/view-listing" component={ViewListing}/>
    <Route path="/view-bookings" component={ViewBookings}/>
  </Switch>

  React.useContext(StoreContext);
  const route = window.location.pathname;
  if (route === '/' || route === '/listings') {
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
  } else if (route.includes('/edit-listing')) {
    return (
      <EditListing />
    );
  } else if (route.includes('/view-listing')) {
    return (
      <ViewListing/>
    )
  } else if (route.includes('/view-bookings')) {
    return (
      <ViewBookings/>
    )
  } else {
    return (
      <h1>Page Not Found!</h1>
    )
  }
}

export default App;
