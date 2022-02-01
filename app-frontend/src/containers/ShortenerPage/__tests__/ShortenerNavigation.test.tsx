import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShortenerNavigationContainer from '../ShortenerNavigationContainer';
import { createMockStore, InitialMockState } from '../../../mocks/store/mockStore';
import { userData } from '../../../mocks/store/constants';
import { LogoutActionType } from '../../../store/actionTypes';

describe('<ShortenerNavigationContainer />', () => {
  describe('Initializeed with ShortenerNavigation component', () => {
    it('Should dispatch a logout action if authorized user clicks logout button', () => {
      const initialState: InitialMockState = {
        user: {
          data: {
            data: userData,
          },
          loading: false,
          error: '',
          userCookie: null,
        },
        searchedLinks: {
          data: null,
          loading: true,
          error: '',
        },
      };
      const store = createMockStore(initialState);
      render(
        <Provider store={store}>
          <ShortenerNavigationContainer />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const logoutButton = screen.getByRole('button', { name: 'log out' });
      userEvent.click(logoutButton);
      const actions = store.getActions();
      expect(actions[0].type).toBe(LogoutActionType.LOGOUT_USER);
    });
  });
});
