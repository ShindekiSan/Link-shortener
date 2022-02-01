import React from 'react';
import { shallow } from 'enzyme';
import Navigation, { NavProps } from '../Navigation';

function noop() {}

describe('<Navigation />', () => {
  const baseProps: NavProps = {
    userName: '',
    isAuthenticated: false,
    logoutHandler: jest.fn(noop),
  };

  describe('Initialized without authentication', () => {
    it('Should have an authentication buttons', () => {
      const wrapper = shallow(
        <Navigation
          userName={baseProps.userName}
          isAuthenticated={baseProps.isAuthenticated}
          logoutHandler={baseProps.logoutHandler}
        />,
      );

      const buttons = wrapper.find('MyAuthButton');

      expect(buttons).toHaveLength(2);
    });
  });

  describe('Initialized with authentication', () => {
    const authProps = {
      ...baseProps,
      userName: 'test',
      isAuthenticated: true,
    };

    it('Should have a userName and logout button', () => {
      const wrapper = shallow(
        <Navigation
          userName={authProps.userName}
          isAuthenticated={authProps.isAuthenticated}
          logoutHandler={authProps.logoutHandler}
        />,
      );
      const buttons = wrapper.find('MyAuthButton');
      const userName = wrapper.find('.authorized-user-name');

      expect(buttons).toHaveLength(1);
      expect(userName.text()).toEqual(authProps.userName);
    });
  });
});
