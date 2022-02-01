import React from 'react';
import { shallow } from 'enzyme';
import SignUp, { SignUpProps } from '../SignUp';

function noop() {}

const props: SignUpProps = {
  loading: false,
  error: '',
  registerHandler: jest.fn(noop),
  changeHandler: jest.fn(noop),
};

const loadingProps: SignUpProps = {
  ...props,
  loading: true,
};

const errorProps: SignUpProps = {
  ...props,
  error: 'error',
};

const setUp = (componentProps: SignUpProps) => shallow(
  <SignUp {...componentProps} />, // eslint-disable-line
);

describe('<SignUp />', () => {
  test('Should call a registration function after a button click', () => {
    const component = setUp(props);
    const signUpButton = component.find('.authorize-button');

    signUpButton.simulate('click');
    expect(props.registerHandler).toHaveBeenCalledTimes(1);
  });

  it('Should update inputs when user types something', () => {
    const component = setUp(props);
    const signUpEmailInput = component.find('#user-email');
    const signUpUsername = component.find('#user-name');
    const signUpPasswordInput = component.find('#user-password');

    signUpEmailInput.simulate('change', '10');
    expect(props.changeHandler).toHaveBeenCalledWith('10');

    signUpUsername.simulate('change', '11');
    expect(props.changeHandler).toHaveBeenCalledWith('11');

    signUpPasswordInput.simulate('change', '12');
    expect(props.changeHandler).toHaveBeenCalledWith('12');
  });

  it('Should show a Loading when loading is true', () => {
    const component = setUp(loadingProps);
    const loadingNotify = component.find('.auth-fail-message');

    expect(loadingNotify.text()).toBe('Loading...');
  });

  it('Should show an error when error isnt null', () => {
    const component = setUp(errorProps);
    const loadingNotify = component.find('.auth-fail-message');

    expect(loadingNotify.text()).toBe('error');
  });
});
