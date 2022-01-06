import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MainPage from './MainPage';
import root from '../../../store/reducers/root';

describe('<MainPage />', () => {
  describe('When rendered', () => {
    beforeEach(() => {
      const store = createStore(root);
      render( // eslint-disable-line
        <Provider store={store}>
          <MainPage />
        </Provider>,
        { wrapper: MemoryRouter },
      );
    });

    it('Should have a header with title and navigation', () => {
      const headerTitle = screen.getByText(/Make your link/);
      const navigaion = screen.getByRole('navigation');

      expect(headerTitle).toBeTruthy();
      expect(navigaion).toBeInTheDocument();
    });

    it('Should have a link input', () => {
      const input = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: 'shorten' });

      expect(input).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it('Should have a footer', () => {
      const footerHeading = screen.getByRole('heading', { name: 'calibri' });

      expect(footerHeading).toBeTruthy();
    });
  });
});
