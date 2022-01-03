import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Navigation, { NavProps } from './Navigation';

function noop() {}

const baseProps: NavProps = {
  userName: '',
  isAuthenticated: false,
  logoutHandler: jest.fn(noop),
};

const authProps = {
  ...baseProps,
  userName: 'hello',
  isAuthenticated: true,
};

describe('<Navigation />', () => {
  describe('Initialized without authentication', () => {
    beforeEach(() => {
      render(<Navigation {...baseProps} />, { wrapper: MemoryRouter }); // eslint-disable-line
    });

    it('Should have a navigation which has logo and search button', () => {
      const navigation = screen.getByRole('navigation');
      const logo = screen.getByText('calibri');
      const searchButton = screen.getByText('search for links');

      expect(logo).toBeInTheDocument();
      expect(navigation).toBeInTheDocument();
      expect(searchButton).toBeInTheDocument();
    });

    it('Should have an authentication buttons', () => {
      const buttons = screen.getAllByRole('button');

      expect(buttons[1]).toHaveClass('auth-button');
      expect(buttons[2]).toHaveClass('auth-button');
    });
  });

  describe('Initialized with authentication', () => {
    beforeEach(() => {
      render(<Navigation {...authProps} />, { wrapper: MemoryRouter }); // eslint-disable-line
    });

    it('Should have a userName and logout button', () => {
      const buttons = screen.getAllByRole('button');
      const userName = screen.getByText(authProps.userName);

      expect(buttons[1]).toHaveClass('auth-button');
      expect(userName).toBeTruthy();
    });

    it('Should show authentication buttons after logout', async () => {
      const logoutButton = screen.getByText('log out');

      user.click(logoutButton);
      expect(authProps.logoutHandler).toHaveBeenCalledTimes(1);
    });
  });
});
