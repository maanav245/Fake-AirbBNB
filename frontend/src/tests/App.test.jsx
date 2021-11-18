import { shallow } from 'enzyme';
import * as React from 'react';

import App from '../App';
import Landing from '../screens/Landing';
import Login from '../screens/Login';
import Register from '../screens/Register';
import HostedListings from '../screens/HostedListings';
import NewListing from '../screens/NewListing';
import EditListing from '../screens/EditListing';
import ViewListing from '../screens/ViewListing';
import ViewBookings from '../screens/ViewBookings';

// Test the main App component
describe('App', () => {
  // Check that the correct page loads by default
  it('loads the listings page by default', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Landing)).toHaveLength(1);
    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find(Register)).toHaveLength(0);
    expect(wrapper.find(HostedListings)).toHaveLength(0);
    expect(wrapper.find(NewListing)).toHaveLength(0);
    expect(wrapper.find(EditListing)).toHaveLength(0);
    expect(wrapper.find(ViewListing)).toHaveLength(0);
    expect(wrapper.find(ViewBookings)).toHaveLength(0);
  });

  // Change the pathname and check that the listings page loads correctly
  it('loads the listings page', () => {
    delete window.location;
    window.location = {};
    window.location.pathname = '/listings';
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Landing)).toHaveLength(1);
    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find(Register)).toHaveLength(0);
    expect(wrapper.find(HostedListings)).toHaveLength(0);
    expect(wrapper.find(NewListing)).toHaveLength(0);
    expect(wrapper.find(EditListing)).toHaveLength(0);
    expect(wrapper.find(ViewListing)).toHaveLength(0);
    expect(wrapper.find(ViewBookings)).toHaveLength(0);
  });

  // Change the pathname and check that the login page loads correctly
  it('loads the login page', () => {
    delete window.location;
    window.location = {};
    window.location.pathname = '/login';
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Landing)).toHaveLength(0);
    expect(wrapper.find(Login)).toHaveLength(1);
    expect(wrapper.find(Register)).toHaveLength(0);
    expect(wrapper.find(HostedListings)).toHaveLength(0);
    expect(wrapper.find(NewListing)).toHaveLength(0);
    expect(wrapper.find(EditListing)).toHaveLength(0);
    expect(wrapper.find(ViewListing)).toHaveLength(0);
    expect(wrapper.find(ViewBookings)).toHaveLength(0);
  });

  // Change the pathname and check that the register page loads correctly
  it('loads the register page', () => {
    delete window.location;
    window.location = {};
    window.location.pathname = '/register';
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Landing)).toHaveLength(0);
    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find(Register)).toHaveLength(1);
    expect(wrapper.find(HostedListings)).toHaveLength(0);
    expect(wrapper.find(NewListing)).toHaveLength(0);
    expect(wrapper.find(EditListing)).toHaveLength(0);
    expect(wrapper.find(ViewListing)).toHaveLength(0);
    expect(wrapper.find(ViewBookings)).toHaveLength(0);
  });

  // Change the pathname and check that the hosted listings page loads correctly
  it('loads the hosted listings page', () => {
    delete window.location;
    window.location = {};
    window.location.pathname = '/hosted-listings';
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Landing)).toHaveLength(0);
    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find(Register)).toHaveLength(0);
    expect(wrapper.find(HostedListings)).toHaveLength(1);
    expect(wrapper.find(NewListing)).toHaveLength(0);
    expect(wrapper.find(EditListing)).toHaveLength(0);
    expect(wrapper.find(ViewListing)).toHaveLength(0);
    expect(wrapper.find(ViewBookings)).toHaveLength(0);
  });

  // Change the pathname and check that the new listing page loads correctly
  it('loads the new listing page', () => {
    delete window.location;
    window.location = {};
    window.location.pathname = '/new-listing';
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Landing)).toHaveLength(0);
    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find(Register)).toHaveLength(0);
    expect(wrapper.find(HostedListings)).toHaveLength(0);
    expect(wrapper.find(NewListing)).toHaveLength(1);
    expect(wrapper.find(EditListing)).toHaveLength(0);
    expect(wrapper.find(ViewListing)).toHaveLength(0);
    expect(wrapper.find(ViewBookings)).toHaveLength(0);
  });

  // Change the pathname and check that the edit listing page loads correctly
  it('loads the edit listing page', () => {
    delete window.location;
    window.location = {};
    window.location.pathname = '/edit-listings';
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Landing)).toHaveLength(0);
    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find(Register)).toHaveLength(0);
    expect(wrapper.find(HostedListings)).toHaveLength(0);
    expect(wrapper.find(NewListing)).toHaveLength(0);
    expect(wrapper.find(EditListing)).toHaveLength(1);
    expect(wrapper.find(ViewListing)).toHaveLength(0);
    expect(wrapper.find(ViewBookings)).toHaveLength(0);
  });

  // Change the pathname and check that the view listing page loads correctly
  it('loads the view listing page', () => {
    delete window.location;
    window.location = {};
    window.location.pathname = '/view-listing';
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Landing)).toHaveLength(0);
    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find(Register)).toHaveLength(0);
    expect(wrapper.find(HostedListings)).toHaveLength(0);
    expect(wrapper.find(NewListing)).toHaveLength(0);
    expect(wrapper.find(EditListing)).toHaveLength(0);
    expect(wrapper.find(ViewListing)).toHaveLength(1);
    expect(wrapper.find(ViewBookings)).toHaveLength(0);
  });

  // Change the pathname and check that the view bookings page loads correctly
  it('loads the view bookings page', () => {
    delete window.location;
    window.location = {};
    window.location.pathname = '/view-bookings';
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Landing)).toHaveLength(0);
    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find(Register)).toHaveLength(0);
    expect(wrapper.find(HostedListings)).toHaveLength(0);
    expect(wrapper.find(NewListing)).toHaveLength(0);
    expect(wrapper.find(EditListing)).toHaveLength(0);
    expect(wrapper.find(ViewListing)).toHaveLength(0);
    expect(wrapper.find(ViewBookings)).toHaveLength(1);
  });

  // Change the pathname to something random and check that none of the pages
  // load but instead give a page not found error
  it('loads the page not found page', () => {
    delete window.location;
    window.location = {};
    window.location.pathname = '/random';
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Landing)).toHaveLength(0);
    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find(Register)).toHaveLength(0);
    expect(wrapper.find(HostedListings)).toHaveLength(0);
    expect(wrapper.find(NewListing)).toHaveLength(0);
    expect(wrapper.find(EditListing)).toHaveLength(0);
    expect(wrapper.find(ViewListing)).toHaveLength(0);
    expect(wrapper.find(ViewBookings)).toHaveLength(0);
    expect(wrapper.find('h1').text()).toBe('Page Not Found!');
  });
});
