import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import LinkInput, { LinkInputProps } from './LinkInput';
import root from '../../../store/reducers/root';

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
      const store = createStore(root);
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
    beforeEach(() => {
      const store = createStore(root);
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
});
