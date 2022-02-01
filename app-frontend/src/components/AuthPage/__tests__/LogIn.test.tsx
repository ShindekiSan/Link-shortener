import React from 'react';
import { shallow } from 'enzyme';
import LogIn, { LogInProps } from '../LogIn';

function noop() {}

const props: LogInProps = {
  loading: false,
  error: '',
  authorizationHandler: jest.fn(noop),
  changeHandler: jest.fn(noop),
};

const loadingProps: LogInProps = {
  ...props,
  loading: true,
};

const errorProps: LogInProps = {
  ...props,
  error: 'error',
};

const setUp = (componentProps: LogInProps) => shallow(
  <LogIn {...componentProps} />, // eslint-disable-line
);

describe('<LogIn />', () => {
  it('Should call an authorization function after pressing Log in', () => {
    const component = setUp(props);
    const logInButton = component.find('.authorize-button');

    logInButton.simulate('click');
    expect(props.authorizationHandler).toHaveBeenCalledTimes(1);
  });

  it('Should update inputs when user types something', () => {
    const component = setUp(props);
    const logInEmailInput = component.find('#user-email');
    const logInPasswordInput = component.find('#user-password');

    logInEmailInput.simulate('change', '12');
    expect(props.changeHandler).toHaveBeenCalledWith('12');

    logInPasswordInput.simulate('change', '12');
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
