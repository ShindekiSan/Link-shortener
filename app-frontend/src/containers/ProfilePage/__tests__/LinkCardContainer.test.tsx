import React from 'react';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LinkCardContainer from '../LinkCardContainer';
import { InitialMockState } from '../../../mocks/store/mockStore';
import { userData, testLink } from '../../../mocks/store/constants';
import { EditLinkActionTypes } from '../../../store/actionTypes';

describe('<LinkCardContainer />', () => {
  describe('Initialized with LinkCard component', () => {
    it('Should dispatch an edit action when user clicks edit and then confirm', () => {
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
          data: {
            data: testLink,
          },
          loading: false,
          error: '',
        },
      };
      const mockStore = configureStore();
      const store = mockStore(initialState);
      render(
        <Provider store={store}>
          <LinkCardContainer
            link={testLink}
            error=""
          />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const editButton = screen.getByRole('button', { name: 'edit' });
      userEvent.click(editButton);
      const editInputs = screen.getAllByRole('textbox');
      const confirmButton = screen.getByRole('button', { name: 'confirm' });
      expect(editInputs).toHaveLength(2);
      userEvent.click(confirmButton);
      const actions = store.getActions();
      expect(actions[0].type).toBe(EditLinkActionTypes.EDIT_LINK_DATA);
    });
  });
});
