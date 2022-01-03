import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import LogIn, { LogInProps } from './LogIn';

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

  it('Should display an authorization page with login form and navigation', () => {
    const logInNavigation = screen.getByRole('navigation');
    const logInButton = screen.getByRole('button', { name: 'Log in', exact: false });
    const logInEmailInput = screen.getByRole('textbox');
    const logInPasswordInput = screen.getByPlaceholderText('password', { exact: false });

    expect(logInNavigation).toBeInTheDocument();
    expect(logInButton).toBeInTheDocument();
    expect(logInEmailInput).toBeInTheDocument();
    expect(logInPasswordInput).toBeInTheDocument();
  });

  it('Should call an authorization function after pressing Log in', () => {
    const logInButton = screen.getByRole('button', { name: 'Log in', exact: false });

    user.click(logInButton);
    expect(props.authorizationHandler).toHaveBeenCalledTimes(1);
  });

  it('Should update inputs when user types something', () => {
    const logInEmailInput = screen.getByRole('textbox');
    const logInPasswordInput = screen.getByPlaceholderText('password', { exact: false });

    user.type(logInEmailInput, '12');
    expect(props.changeHandler).toHaveBeenCalled();
    expect(logInEmailInput).toHaveValue('12');

    user.type(logInPasswordInput, '12');
    expect(props.changeHandler).toHaveBeenCalled();
    expect(logInPasswordInput).toHaveValue('12');
  });
});
