import { mount } from 'enzyme';
import * as React from 'react';

import { StoreContext } from '../Store';
import Modal, { ErrorContent } from '../components/Modal';
import { StyledForm } from '../components/StyledComponents.jsx'

// Test the modal window displays appropriate content
describe('Modal', () => {
  // Check that it raises the correct error when raised
  it('raises a given error', () => {
    const testVal = {
      modal: {
        modal: 'Error!',
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <Modal/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(ErrorContent).first().text()).toBe('Error!');
    expect(wrapper.find(StyledForm)).toHaveLength(0);
  });

  // Check that it si not visible when there is no error
  it('does not exist when there is no error', () => {
    const testVal = {
      modal: {
        modal: '',
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <Modal/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(ErrorContent)).toHaveLength(0);
    expect(wrapper.find(StyledForm)).toHaveLength(0);
  });

  // Check a special case, where it is used for the filter screen
  it('displays the filter modal as required', () => {
    const testVal = {
      modal: {
        modal: 'filters',
      },
    }
    const wrapper = mount(
      <StoreContext.Provider value={testVal}>
        <Modal/>
      </StoreContext.Provider>
    );
    expect(wrapper.find(ErrorContent)).toHaveLength(0);
    expect(wrapper.find(StyledForm)).toHaveLength(1);
  });
});
