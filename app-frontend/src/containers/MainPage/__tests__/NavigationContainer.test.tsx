import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavigationContainer from '../NavigationContainer';
import { createMockStore, InitialMockState } from '../../../mocks/store/mockStore';
import { userData } from '../../../mocks/store/constants';
import { LogoutActionType } from '../../../store/actionTypes';

describe('<NavigationContainer />', () => {
  describe('Rendered with Navigation component', () => {
    it('Should log out user when logout button is clicked', () => {
      const initialState: InitialMockState = {
        user: {
          data: {
            data: userData,
          },
          loading: false,
          error: '',
          userCookie: null,
        },
      };
      const store = createMockStore(initialState);
      render(
        <Provider store={store}>
          <NavigationContainer />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const logOutButton = screen.getByRole('button', { name: 'log out' });
      userEvent.click(logOutButton);
      const actions = store.getActions();
      expect(actions[0].type).toBe(LogoutActionType.LOGOUT_USER);
    });
  });
});
