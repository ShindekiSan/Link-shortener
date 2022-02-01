import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import LinkInput, { LinkInputProps } from '../LinkInput';
import { createMockStore, InitialMockState } from '../../../mocks/store/mockStore';
import { testLink, userData } from '../../../mocks/store/constants';

function noop() {}

const props: LinkInputProps = {
  isAuthenticated: false,
  linkValue: '',
  changeHandler: jest.fn(noop),
  pressHandler: jest.fn(noop),
  clickHandler: jest.fn(noop),
};

const authorizedProps: LinkInputProps = {
  ...props,
  isAuthenticated: true,
};

describe('<LinkInput />', () => {
  describe('Rendered for unauthorized user', () => {
    it('Should have disabled input field and submit button', () => {
      const initialState: InitialMockState = {
        link: {
          data: null,
          loading: false,
          error: '',
        },
      };
      const store = createMockStore(initialState);
      render(
        <Provider store={store}>
          {/* eslint-disable-next-line */}
          <LinkInput {...props} />
        </Provider>,
      );

      const input = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button');
      const inputParagraph = screen.getByText('Can only be used by authorized user');

      expect(input).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(inputParagraph).toBeTruthy();
    });
  });

  describe('Rendered for authorized user', () => {
    const initialState: InitialMockState = {
      link: {
        data: null,
        loading: false,
        error: '',
      },
    };

    beforeEach(() => {
      const store = createMockStore(initialState);
      render( // eslint-disable-line
        <Provider store={store}>
          {/* eslint-disable-next-line */}
          <LinkInput {...authorizedProps} />
        </Provider>,
      );
    });

    it('Should have enabled input and submit button', () => {
      const input = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button');

      expect(input).toBeEnabled();
      expect(submitButton).toBeEnabled();
    });
  });

  describe('Should return a message for user after action dispatching', () => {
    it('Message if request went successfull', () => {
      const linkMessageState: InitialMockState = {
        user: {
          loading: false,
          error: '',
          data: {
            data: userData,
          },
          userCookie: null,
        },
        link: {
          loading: false,
          error: '',
          data: {
            data: testLink,
          },
        },
      };
      const store = createMockStore(linkMessageState);
      render(
        <Provider store={store}>
          {/* eslint-disable-next-line */}
          <LinkInput {...authorizedProps} />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const inputParagraph = screen.getByText('message!');
      expect(inputParagraph).toBeInTheDocument();
    });

    it('Error if request went unsuccessfull', () => {
      const linkErrorState: InitialMockState = {
        user: {
          loading: false,
          error: '',
          data: {
            data: userData,
          },
          userCookie: null,
        },
        link: {
          data: null,
          loading: false,
          error: 'error',
        },
      };
      const store = createMockStore(linkErrorState);
      render(
        <Provider store={store}>
          {/* eslint-disable-next-line */}
          <LinkInput {...authorizedProps} />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const inputParagraph = screen.getByText('error');
      expect(inputParagraph).toBeInTheDocument();
    });
  });
});
