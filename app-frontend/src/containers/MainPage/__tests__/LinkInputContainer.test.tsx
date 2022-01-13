import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LinkInputContainer from '../LinkInputContainer';
import root from '../../../store/reducers/root';
import { createMockStore, InitialMockState } from '../../../mocks/store/mockStore';
import { userData } from '../../../mocks/store/constants';
import { AddLinkActionTypes } from '../../../store/actionTypes';

const initialState: InitialMockState = {
  user: {
    data: {
      data: userData,
    },
    loading: false,
    error: '',
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
      const store = createStore(root);
      render(
        <Provider store={store}>
          <LinkInputContainer />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const shortenButton = screen.getByRole('button', { name: 'shorten' });
      userEvent.click(shortenButton);
      const state = store.getState();
      expect(state.link.loading).toBe(false);
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
      expect(actions[0].type).toBe(AddLinkActionTypes.ADD_LINK_DATA);
    });

    describe('Should return a message for user after action dispatching', () => {
      it('Message if request went successfull', () => {
        const linkMessageState: InitialMockState = {
          ...initialState,
          link: {
            ...initialState.link!,
            data: {
              data: {
                message: 'Message!',
              },
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

        const inputParagraph = screen.getByText('Message!');
        expect(inputParagraph).toBeInTheDocument();
      });

      it('Error if request went unsuccessfull', () => {
        const linkErrorState: InitialMockState = {
          ...initialState,
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
