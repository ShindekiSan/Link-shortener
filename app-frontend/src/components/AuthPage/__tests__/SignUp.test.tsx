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

const setUp = () => shallow(
  <SignUp
    loading={props.loading}
    error={props.error}
    registerHandler={props.registerHandler}
    changeHandler={props.changeHandler}
  />,
);

describe('<SignUp />', () => {
  test('Should call a registration function after a button click', () => {
    const component = setUp();
    const signUpButton = component.find('.authorize-button');

    signUpButton.simulate('click');
    expect(props.registerHandler).toHaveBeenCalledTimes(1);
  });

  it('Should update inputs when user types something', () => {
    const component = setUp();
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
});
