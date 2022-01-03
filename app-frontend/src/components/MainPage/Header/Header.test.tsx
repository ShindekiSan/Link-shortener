import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import user from '../../../store/reducers/authorization';
import Header from './Header';

function createTestStore() {
  const store = createStore(
    combineReducers({
      user,
    }),
  );
  return store;
}

describe('<Header />', () => {
  describe('Rendered for unauthorized user', () => {
    beforeEach(() => {
      const store = createTestStore();
      render( // eslint-disable-line
        <Provider store={store}>
          <Header />
        </Provider>,
        { wrapper: MemoryRouter },
      );
    });

    it('Should have a navigation', () => {
      const headerNavigation = screen.getByRole('navigation');

      expect(headerNavigation).toBeInTheDocument();
    });

    it('Should contain a heading', () => {
      const headerHeading = screen.getByRole('heading');

      expect(headerHeading).toBeInTheDocument();
    });

    it('Should have a description paragraph', () => {
      const headerDescription = screen.getByText(/Make your link/);

      expect(headerDescription).toBeTruthy();
    });

    it('Should have an authorization buttons', () => {
      const headerButtons = screen.getAllByRole('button');

      expect(headerButtons).toHaveLength(5);
    });
  });
});
