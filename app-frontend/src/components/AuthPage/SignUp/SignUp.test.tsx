import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import SignUp, { SignUpProps } from './SignUp';

function noop() {}

const props: SignUpProps = {
  loading: false,
  error: '',
  registerHandler: jest.fn(noop),
  changeHandler: jest.fn(noop),
};

describe('<SignUp />', () => {
  beforeEach(() => {
    render(<SignUp { ...props } />, { wrapper: MemoryRouter }); // eslint-disable-line
  });

  test('Should display a registartion page with signup form and navigation', () => {
    const signUpNavigation = screen.getByRole('navigation');
    const SignUpButton = screen.getByRole('button', { name: 'Create an account' });
    const signUpInputs = screen.getAllByRole('textbox');
    const signUpPasswordInput = screen.getByPlaceholderText('password', { exact: false });

    expect(signUpNavigation).toBeInTheDocument();
    expect(SignUpButton).toBeInTheDocument();
    expect(signUpInputs).toHaveLength(2);
    expect(signUpPasswordInput).toBeInTheDocument();
  });

  test('Should call a registration function after a button click', () => {
    const signUpButton = screen.getByRole('button', { name: 'Create an account' });

    user.click(signUpButton);
    expect(props.registerHandler).toHaveBeenCalledTimes(1);
  });
});
