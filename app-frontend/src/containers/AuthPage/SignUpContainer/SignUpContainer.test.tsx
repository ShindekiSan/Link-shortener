import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpContainer from './SignUpContainer';
import root from '../../../store/reducers/root';

describe('<LogInContainer />', () => {
  describe('Rendered with Log In component', () => {
    it('Should dispatch an action when log in button is clicked', () => {
      const store = createStore(root);
      render(
        <Provider store={store}>
          <SignUpContainer />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const logInButton = screen.getByRole('button', { name: 'Create an account' });
      userEvent.click(logInButton);
      const state = store.getState();
      expect(state.user.loading).toBe(true);
    });
  });
});
