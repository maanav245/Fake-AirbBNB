import { shallow } from 'enzyme';
import * as React from 'react';
import { LinkButton, StyledLink } from '../components/LinkButton';

describe('LinkButton', () => {
  const noop = () => {};

  it('links to another route', () => {
    const button = shallow(<LinkButton to={'/login'} onClick={noop} value={'test'} />);
    expect(button.find(StyledLink).first().props().to).toBe('/login');
  });

  it('triggers onClick event handler when clicked', () => {
    const onClick = jest.fn();
    const button = shallow(<LinkButton to={'.'} onClick={onClick} value={'test'} />);
    button.find(StyledLink).first().simulate('click');
    expect(onClick).toBeCalledTimes(1);
  });

  it('sets button text', () => {
    const button = shallow(<LinkButton to={'.'} onClick={noop} value={'test'} />);
    expect(button.find(StyledLink).first().text()).toBe('test');
  });

  it('sets button id', () => {
    const button = shallow(<LinkButton id={'button'} to={'.'} onClick={noop} value={'test'} />);
    expect(button.find(StyledLink).first().props().id).toBe('button');
  });
});
