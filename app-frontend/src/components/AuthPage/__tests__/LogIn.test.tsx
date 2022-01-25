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

const setUp = () => shallow(
  <LogIn
    loading={props.loading}
    error={props.error}
    authorizationHandler={props.authorizationHandler}
    changeHandler={props.changeHandler}
  />,
);

describe('<LogIn />', () => {
  it('Should call an authorization function after pressing Log in', () => {
    const component = setUp();
    const logInButton = component.find('.authorize-button');

    logInButton.simulate('click');
    expect(props.authorizationHandler).toHaveBeenCalledTimes(1);
  });

  it('Should update inputs when user types something', () => {
    const component = setUp();
    const logInEmailInput = component.find('#user-email');
    const logInPasswordInput = component.find('#user-password');

    logInEmailInput.simulate('change', '12');
    expect(props.changeHandler).toHaveBeenCalledWith('12');

    logInPasswordInput.simulate('change', '12');
    expect(props.changeHandler).toHaveBeenCalledWith('12');
  });
});
