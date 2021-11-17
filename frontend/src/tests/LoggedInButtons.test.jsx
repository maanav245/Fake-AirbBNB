import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { LinkButton } from '../components/LinkButton';
import LoggedInButtons from '../components/LoggedInButtons';
import StoreProvider from '../Store'
import { StoreContext } from '../Store';
import { Banner } from '../components/StyledComponents';

describe('LoggedInButtons', () => {
  it('does not display if not logged in', () => {
    const wrapper = mount(
      <StoreProvider>
        <LoggedInButtons/>
      </StoreProvider>
    );
    expect(wrapper.find(Banner)).toHaveLength(1);
    expect(wrapper.find(LinkButton)).toHaveLength(0);
  });

  it('displays if logged in', () => {
    const testVal = {
      token: {
        token: 'abc',
        setToken: jest.fn(),
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <LoggedInButtons/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(LinkButton)).toHaveLength(2);
  });
});
