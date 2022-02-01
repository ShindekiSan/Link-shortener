import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogInContainer from '../LogInContainer';
import { createMockStore, InitialMockState } from '../../../mocks/store/mockStore';
import { AuthorizeActionTypes } from '../../../store/actionTypes';

const initialState: InitialMockState = {
  user: {
    data: null,
    loading: false,
    error: '',
    userCookie: null,
  },
};

describe('<LogInContainer />', () => {
  describe('Rendered with Log In component', () => {
    it('Should dispatch an action when log in button is clicked', () => {
      const store = createMockStore(initialState);
      render(
        <Provider store={store}>
          <LogInContainer />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const logInButton = screen.getByRole('button', { name: 'Log in' });
      userEvent.click(logInButton);
      const actions = store.getActions();
      expect(actions[0].type).toEqual(AuthorizeActionTypes.AUTHORIZE_USER_DATA);
    });
  });
});
