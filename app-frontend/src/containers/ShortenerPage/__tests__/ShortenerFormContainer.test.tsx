import React from 'react';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShortenerFormContainer from '../ShortenerFormContainer';
import { createMockStore, InitialMockState } from '../../../mocks/store/mockStore';
import { userData, testLink } from '../../../mocks/store/constants';
import { AddLinkActionTypes } from '../../../store/actionTypes';

const initialState: InitialMockState = {
  user: {
    data: {
      data: userData,
    },
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

describe('<ShortenerFormContainer />', () => {
  describe('Initializeed with ShortenerForm component', () => {
    it('Should dispatch an action when user clicks on a shorten button', () => {
      const store = createMockStore(initialState);
      render(
        <Provider store={store}>
          <ShortenerFormContainer />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const shortenButton = screen.getByRole('button', { name: 'shorten' });
      const linkInput = screen.getByPlaceholderText(/enter your link/i);
      const descriptionTextarea = screen.getByPlaceholderText(/description/);
      const tagsTextarea = screen.getByPlaceholderText(/tags/);

      userEvent.type(linkInput, 'link');
      userEvent.type(descriptionTextarea, 'test description');
      userEvent.type(tagsTextarea, 'test');
      userEvent.click(shortenButton);

      const actions = store.getActions();
      const action = actions[0];
      expect(action.type).toBe(AddLinkActionTypes.ADD_LINK_DATA);
      expect(action.payload.from).toBe('link');
      expect(action.payload.description).toBe('test description');
      expect(action.payload.tags).toStrictEqual([{ tagName: 'test' }]);
    });

    describe('Should return a message for user after action dispatching', () => {
      it('Message if request went successfull', () => {
        const linkMessageState: InitialMockState = {
          ...initialState,
          link: {
            loading: false,
            error: '',
            data: {
              data: testLink,
            },
          },
        };
        const mockStore = configureStore();
        const store = mockStore(linkMessageState);
        render(
          <Provider store={store}>
            <ShortenerFormContainer />
          </Provider>,
          { wrapper: MemoryRouter },
        );

        const inputParagraph = screen.getByText('message!');
        expect(inputParagraph).toBeInTheDocument();
      });

      it('Error if request went unsuccessfull', () => {
        const linkErrorState: InitialMockState = {
          ...initialState,
          link: {
            data: null,
            loading: false,
            error: 'error',
          },
        };
        const mockStore = configureStore();
        const store = mockStore(linkErrorState);
        render(
          <Provider store={store}>
            <ShortenerFormContainer />
          </Provider>,
          { wrapper: MemoryRouter },
        );

        const inputParagraph = screen.getByText('error');
        expect(inputParagraph).toBeInTheDocument();
      });
    });
  });
});
