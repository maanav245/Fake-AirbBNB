import { mount } from 'enzyme';
import * as React from 'react';

import { StoreContext } from '../Store';
import { LinkButton } from '../components/LinkButton';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

// Test the login/logout button displays the correct button depending on the
// user state
describe('LoginButton', () => {
  // Check that the page displays the login/register button when logged out
  // Manipulate the test context to simulate an empty token representing no
  // user logged in
  it('provides a button to log in when logged out', () => {
    const testVal = {
      token: {
        token: '',
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <LoginButton/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(LogoutButton)).toHaveLength(0);
    expect(wrapper.find(LinkButton)).toHaveLength(1);
  });

  // Check that the page displays the logout button when logged in
  // Manipulate the test context to simulate a non-empty token representing a
  // user is logged in
  it('provides a button to log out when logged in', () => {
    const testVal = {
      token: {
        token: 'abc',
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <LoginButton/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(LogoutButton)).toHaveLength(1);
    expect(wrapper.find(LinkButton)).toHaveLength(1);
  });
});
