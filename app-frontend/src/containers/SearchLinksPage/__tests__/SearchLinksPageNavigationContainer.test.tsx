import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchLinksPageNavigationContainer from '../SearchLinksPageNavigationContainer';
import { createMockStore, InitialMockState } from '../../../mocks/store/mockStore';
import { userData } from '../../../mocks/store/constants';
import { LogoutActionType, LoadSearchedLinksActionTypes } from '../../../store/actionTypes';

const initialState: InitialMockState = {
  user: {
    data: null,
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

describe('<SearchLinksPageContainer />', () => {
  describe('Initializeed with SearchLinksPage component', () => {
    it('Should dispatch an action when user presses Enter on search field', () => {
      const store = createMockStore(initialState);
      render(
        <Provider store={store}>
          <SearchLinksPageNavigationContainer />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const searchInput = screen.getByRole('searchbox');
      userEvent.type(searchInput, '123');
      searchInput.focus();
      userEvent.keyboard('{enter}');
      const actions = store.getActions();
      expect(actions[0].type).toBe(LoadSearchedLinksActionTypes.LOAD_SEARCHED_LINKS_DATA);
      expect(actions[0].payload).toBe('123');
    });

    it('Should dispatch a logout action if authorized user clicks logout button', () => {
      const userState: InitialMockState = {
        ...initialState,
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
      render(
        <Provider store={store}>
          <SearchLinksPageNavigationContainer />
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
