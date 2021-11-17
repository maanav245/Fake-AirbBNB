import { mount } from 'enzyme';
import * as React from 'react';
import { LinkButton } from '../components/LinkButton';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import { StoreContext } from '../Store';

describe('LoginButton', () => {
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
