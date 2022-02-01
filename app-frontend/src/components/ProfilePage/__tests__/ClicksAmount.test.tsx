import React from 'react';
import { render, screen } from '@testing-library/react';
import ClicksAmount, { LinkClicks } from '../ClicksAmount';

const props: LinkClicks[] = [
  { clicks: 2 }, { clicks: 3 },
];

describe('<ClicksAmount />', () => {
  describe('Initialized with links clicks 2 and 3', () => {
    it('Should show a paragraph with number of clicks 5', () => {
      render(<ClicksAmount links={props} />);

      const clicksParagraph = screen.getByText(/Amount of clicks/);

      expect(clicksParagraph).toHaveTextContent('Amount of clicks on all your links is:5');
    });
  });
});
