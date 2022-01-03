import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import LinksBlock, { Props } from './LinksBlock';

const linksProps: Props = {
  linksArray: [
    {
      from: '123',
      clicks: 2,
      _id: '16',
    },
    {
      from: '456',
      clicks: 3,
      _id: '15',
    },
  ],
  error: '',
};

const linksErrorProps: Props = {
  linksArray: [],
  error: 'Error occured',
};

describe('<LinksBlock />', () => {
  describe('Initialized with props, containing array with 2 links', () => {
    it('Should have a 2 div elements', () => {
      render(<LinksBlock {...linksProps} />, { wrapper: MemoryRouter }); // eslint-disable-line

      const firstLink = screen.getByText(linksProps.linksArray[0].from);
      const secondLink = screen.getByText(linksProps.linksArray[1].from);

      expect(firstLink).toBeInTheDocument();
      expect(secondLink).toBeInTheDocument();
    });
  });

  describe('Initialized with error', () => {
    it('Should have a paragraph with error message', () => {
      render(<LinksBlock {...linksErrorProps} />, { wrapper: MemoryRouter }) // eslint-disable-line

      const errorMessage = screen.getByText(linksErrorProps.error);

      expect(errorMessage).toBeTruthy();
    });
  });
});
