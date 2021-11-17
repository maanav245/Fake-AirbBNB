import { mount } from 'enzyme';
import * as React from 'react';
import Modal, { ErrorContent } from '../components/Modal';
import { StoreContext } from '../Store';
import { StyledForm } from '../components/StyledComponents.jsx'

describe('Modal', () => {
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
