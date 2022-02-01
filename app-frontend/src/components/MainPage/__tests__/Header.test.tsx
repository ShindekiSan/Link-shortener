import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from '../Header';
import { createMockStore, InitialMockState } from '../../../mocks/store/mockStore';
import { userData } from '../../../mocks/store/constants';

describe('<Header />', () => {
  describe('Rendered for unauthorized user', () => {
    it('Should have an authorization buttons in header', () => {
      const initialState: InitialMockState = {
        user: {
          data: null,
          loading: false,
          error: '',
          userCookie: null,
        },
      };
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
    it('Should have a start button in header', () => {
      const userState: InitialMockState = {
        user: {
          loading: false,
          error: '',
          data: {
            data: userData,
          },
          userCookie: null,
        },
      };
      const store = createMockStore(userState);
      render( // eslint-disable-line
        <Provider store={store}>
          <Header />
        </Provider>,
        { wrapper: MemoryRouter },
      );
      const startButton = screen.getByRole('button', { name: 'start' });

      expect(startButton).toBeInTheDocument();
    });
  });
});
