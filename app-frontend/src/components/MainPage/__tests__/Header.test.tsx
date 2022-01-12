import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from '../Header';
import { createMockStore, InitialMockState } from '../../../mocks/store/mockStore';
import { userData } from '../../../mocks/store/constants';

const initialState: InitialMockState = {
  user: {
    data: null,
    loading: false,
    error: '',
  },
};

describe('<Header />', () => {
  describe('Should be rendered with', () => {
    beforeEach(() => {
      const store = createMockStore(initialState);
      render( // eslint-disable-line
        <Provider store={store}>
          <Header />
        </Provider>,
        { wrapper: MemoryRouter },
      );
    });

    it('Navigation', () => {
      const headerNavigation = screen.getByRole('navigation');

      expect(headerNavigation).toBeInTheDocument();
    });

    it('Heading', () => {
      const headerHeading = screen.getByRole('heading');

      expect(headerHeading).toBeInTheDocument();
    });

    it('Description paragraph', () => {
      const headerDescription = screen.getByText(/Make your link/);

      expect(headerDescription).toBeTruthy();
    });
  });

  describe('Rendered for unauthorized user', () => {
    it('Should have an authorization buttons both in navigation and header', () => {
      const store = createMockStore(initialState);
      render(
        <Provider store={store}>
          <Header />
        </Provider>,
        { wrapper: MemoryRouter },
      );
      const logInButtons = screen.getAllByRole('button', { name: 'log in' });
      const signUpButtons = screen.getAllByRole('button', { name: 'sign up' });

      expect(logInButtons).toHaveLength(2);
      expect(signUpButtons).toHaveLength(2);
    });
  });

  describe('Rendered for authorized user', () => {
    beforeEach(() => {
      const userState: InitialMockState = {
        user: {
          ...initialState.user!,
          data: {
            data: userData,
          },
        },
      };
      const store = createMockStore(userState);
      render( // eslint-disable-line
        <Provider store={store}>
          <Header />
        </Provider>,
        { wrapper: MemoryRouter },
      );
    });

    it('Should have a log out button and username link in navigation', () => {
      const logoutButton = screen.getByRole('button', { name: 'log out' });
      const usernameLink = screen.getByRole('link', { name: 'test' });

      expect(logoutButton).toBeInTheDocument();
      expect(usernameLink).toBeInTheDocument();
    });

    it('Should have a start button in header', () => {
      const startButton = screen.getByRole('button', { name: 'start' });

      expect(startButton).toBeInTheDocument();
    });
  });
});
