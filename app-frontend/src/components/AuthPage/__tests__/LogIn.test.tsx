import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import * as enzyme from 'enzyme';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogIn, { LogInProps } from '../LogIn';

function noop() {}

const props: LogInProps = {
  loading: false,
  error: '',
  authorizationHandler: jest.fn(noop),
  changeHandler: jest.fn(noop),
};

describe('<LogIn />', () => {
  beforeEach(() => {
    render(<LogIn {...props} />, { wrapper: MemoryRouter }); // eslint-disable-line
  });

  it('Should call an authorization function after pressing Log in', () => {
    const wrapper = enzyme.shallow(<LogIn {...props} />); // eslint-disable-line
    const logInButton = wrapper.find('.authorize-button');

    logInButton.simulate('click');
    expect(props.authorizationHandler).toHaveBeenCalledTimes(1);
  });

  it('Should update inputs when user types something', () => {
    const wrapper = enzyme.shallow(<LogIn {...props} />); // eslint-disable-line
    const logInEmailInput = screen.getByRole('textbox');
    const logInPasswordInput = screen.getByPlaceholderText('password', { exact: false });

    userEvent.type(logInEmailInput, '12');
    expect(props.changeHandler).toHaveBeenCalled();
    expect(logInEmailInput).toHaveValue('12');

    userEvent.type(logInPasswordInput, '12');
    expect(props.changeHandler).toHaveBeenCalled();
    expect(logInPasswordInput).toHaveValue('12');
  });
});
