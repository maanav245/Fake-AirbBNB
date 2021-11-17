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

describe('App', () => {
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
  });
});
