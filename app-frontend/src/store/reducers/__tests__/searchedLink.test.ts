import searchedLink, { initialState } from '../searchedLink';
import loadSearchedLinkData, { loadSearchedLinkDataFailed, loadSearchedLinkDataSuccess } from '../../actions/loadSearchedLinkData/loadSearchedLinkData';
import { testLink } from '../../../mocks/store/constants';

const linkState = {
  data: testLink,
};

describe('links reducer', () => {
  describe('should return loading=true', () => {
    it('When dispatching LOAD_SEARCHED_LINKS_DATA action', () => {
      const reducer = searchedLink(initialState, loadSearchedLinkData('123'));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('should return an error', () => {
    it('When dispatching LOAD_SEARCHED_LINKS_FAILED action', () => {
      const reducer = searchedLink(initialState, loadSearchedLinkDataFailed('error'));
      expect(reducer).toEqual({
        ...initialState,
        error: 'error',
      });
    });
  });

  describe('should return an array of links', () => {
    it('When disaptching LOAD_SEARCHED_LINKS_SUCCESS action', () => {
      const reducer = searchedLink(initialState, loadSearchedLinkDataSuccess(linkState));
      expect(reducer).toEqual({
        ...initialState,
        data: linkState,
      });
    });
  });
});
