import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LinkInputContainer from '../LinkInputContainer';
import { createMockStore, InitialMockState } from '../../../mocks/store/mockStore';
import { userData, testLink } from '../../../mocks/store/constants';

const initialState: InitialMockState = {
  user: {
    data: null,
    loading: false,
    error: '',
    userCookie: null,
  },
  link: {
    data: null,
    loading: false,
    error: '',
  },
};

describe('<LinkInputContainer />', () => {
  describe('Initialized with LinkInput component', () => {
    it('Should not dispatch a link action when unauthorized user clicks on a button', () => {
      const store = createMockStore(initialState);
      render(
        <Provider store={store}>
          <LinkInputContainer />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const shortenButton = screen.getByRole('button', { name: 'shorten' });
      userEvent.click(shortenButton);
      const actions = store.getActions();
      expect(actions).toHaveLength(0);
    });
  });

  describe('Should work with redux when authorized user clicks a button', () => {
    it('Should dispatch a link action when authorized user clicks on a button', () => {
      const store = createMockStore(initialState);
      render(
        <Provider store={store}>
          <LinkInputContainer />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const shortenButton = screen.getByRole('button', { name: 'shorten' });
      userEvent.click(shortenButton);
      const actions = store.getActions();
      expect(actions).toHaveLength(0);
    });

    describe('Should return a message for user after action dispatching', () => {
      it('Message if request went successfull', () => {
        const linkMessageState: InitialMockState = {
          user: {
            ...initialState.user!,
            data: {
              data: userData,
            },
          },
          link: {
            ...initialState.link!,
            data: {
              data: testLink,
            },
          },
        };
        const store = createMockStore(linkMessageState);
        render(
          <Provider store={store}>
            <LinkInputContainer />
          </Provider>,
          { wrapper: MemoryRouter },
        );

        const inputParagraph = screen.getByText('message!');
        expect(inputParagraph).toBeInTheDocument();
      });

      it('Error if request went unsuccessfull', () => {
        const linkErrorState: InitialMockState = {
          user: {
            ...initialState.user!,
            data: {
              data: userData,
            },
          },
          link: {
            ...initialState.link!,
            error: 'error',
          },
        };
        const store = createMockStore(linkErrorState);
        render(
          <Provider store={store}>
            <LinkInputContainer />
          </Provider>,
          { wrapper: MemoryRouter },
        );

        const inputParagraph = screen.getByText('error');
        expect(inputParagraph).toBeInTheDocument();
      });
    });
  });
});
