import React from 'react';
import { shallow } from 'enzyme';
import LinksBlock, { Props } from '../LinksBlock';

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
      const wrapper = shallow(
        <LinksBlock
          linksArray={linksProps.linksArray}
          error={linksProps.error}
        />,
      );

      const links = wrapper.find('LinkInfo');

      expect(links).toHaveLength(2);
    });
  });

  describe('Initialized with error', () => {
    it('Should have a paragraph with error message', () => {
      const wrapper = shallow(
        <LinksBlock
          linksArray={linksErrorProps.linksArray}
          error={linksErrorProps.error}
        />,
      );

      const errorMessage = wrapper.find('.searched-links-error');

      expect(errorMessage.text()).toEqual(linksErrorProps.error);
    });
  });
});
