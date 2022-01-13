import link, { initialState } from '../link';
import addLink, { addLinkFailed, addLinkSuccess } from '../../actions/addLink/addLink';
import editLinkData, { editLinkDataFailed, editLinkDataSuccess } from '../../actions/editLinkData/editLinkData';
import loadLinkData, { loadLinkDataFailed, loadLinkDataSuccess } from '../../actions/loadLinkData/loadLinkData';
import { loadLink, editData, linkState } from '../../../mocks/store/constants';

const newLink = {
  from: '12',
};

describe('link reducer', () => {
  describe('should return loading=true', () => {
    it('When dispatching LOAD_LINK_DATA action', () => {
      const reducer = link(initialState, loadLinkData(loadLink));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('When dispatching EDIT_LINK_DATA action', () => {
      const reducer = link(initialState, editLinkData(editData));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('When dispatching ADD_LINK_DATA action', () => {
      const reducer = link(initialState, addLink(newLink));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('should return an error', () => {
    it('When dispatching LOAD_LINK_FAILED action', () => {
      const reducer = link(initialState, loadLinkDataFailed('error'));
      expect(reducer).toEqual({
        ...initialState,
        error: 'error',
      });
    });

    it('When dispatching EDIT_LINK_FAILED action', () => {
      const reducer = link(initialState, editLinkDataFailed('error'));
      expect(reducer).toEqual({
        ...initialState,
        error: 'error',
      });
    });

    it('When dispatching ADD_LINK_FAILED action', () => {
      const reducer = link(initialState, addLinkFailed('error'));
      expect(reducer).toEqual({
        ...initialState,
        error: 'error',
      });
    });
  });

  describe('should return a link', () => {
    it('When dispatch LOAD_LINK_SUCCESS action', () => {
      const reducer = link(initialState, loadLinkDataSuccess(linkState));
      expect(reducer).toEqual({
        ...initialState,
        data: linkState,
      });
    });

    it('When dispatch EDIT_LINK_SUCCESS action', () => {
      const reducer = link(initialState, editLinkDataSuccess(linkState));
      expect(reducer).toEqual({
        ...initialState,
        data: linkState,
      });
    });

    it('When dispatch ADD_LINK_SUCCESS action', () => {
      const reducer = link(initialState, addLinkSuccess(linkState));
      expect(reducer).toEqual({
        ...initialState,
        data: linkState,
      });
    });
  });
});
