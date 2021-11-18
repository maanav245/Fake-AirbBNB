import { mount } from 'enzyme';
import * as React from 'react';

import { StoreContext } from '../Store';
import { LinkButton } from '../components/LinkButton';
import LoggedInButtons from '../components/LoggedInButtons';
import { Banner } from '../components/StyledComponents';

// Test the listings and hosted listings buttons appear when logged in
describe('LoggedInButtons', () => {
  // Check that they do not display when not logged in
  // Manipulate the test context to simulate an empty token representing no
  // user logged in
  it('does not display if not logged in', () => {
    const testVal = {
      token: {
        token: '',
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <LoggedInButtons/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(Banner)).toHaveLength(1);
    expect(wrapper.find(LinkButton)).toHaveLength(0);
  });

  // Check that they do display when logged in
  // Manipulate the test context to simulate a non-empty token representing a
  // user is logged in
  it('displays if logged in', () => {
    const testVal = {
      token: {
        token: 'abc',
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
