import { shallow } from 'enzyme';
import * as React from 'react';

import { LinkButton, StyledLink } from '../components/LinkButton';

// Test the custom LinkButton component
describe('LinkButton', () => {
  const noop = () => {};

  // Check that it successfully passes the to property
  it('links to another route', () => {
    const button = shallow(<LinkButton to={'/login'} onClick={noop} value={'test'} />);
    expect(button.find(StyledLink).first().props().to).toBe('/login');
  });

  // Check that it triggers an onClick event handler
  it('triggers onClick event handler when clicked', () => {
    const onClick = jest.fn();
    const button = shallow(<LinkButton to={'.'} onClick={onClick} value={'test'} />);
    button.find(StyledLink).first().simulate('click');
    expect(onClick).toBeCalledTimes(1);
  });

  // Check that it sets text appropriately
  it('sets button text', () => {
    const button = shallow(<LinkButton to={'.'} onClick={noop} value={'test'} />);
    expect(button.find(StyledLink).first().text()).toBe('test');
  });

  // Check that it successfully passes the id property
  it('sets button id', () => {
    const button = shallow(<LinkButton id={'button'} to={'.'} onClick={noop} value={'test'} />);
    expect(button.find(StyledLink).first().props().id).toBe('button');
  });
});
