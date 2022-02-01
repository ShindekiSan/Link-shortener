import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpContainer from '../SignUpContainer';
import { createMockStore, InitialMockState } from '../../../mocks/store/mockStore';
import { RegisterActionTypes } from '../../../store/actionTypes';

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
          <SignUpContainer />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const logInButton = screen.getByRole('button', { name: 'Create an account' });
      userEvent.click(logInButton);
      const actions = store.getActions();
      expect(actions[0].type).toEqual(RegisterActionTypes.REGISTER_USER_DATA);
    });
  });
});
