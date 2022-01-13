import searchedLinks, { initialState } from '../searchedLinks';
import loadSearchedLinksData, { loadSearchedLinksDataFailed, loadSearchedLinksDataSuccess } from '../../actions/loadSearchedLinksData/loadSearchedLinksData';
import { testLink } from '../../../mocks/store/constants';

const linksState = [
  testLink,
];

describe('links reducer', () => {
  describe('should return loading=true', () => {
    it('When dispatching LOAD_SEARCHED_LINKS_DATA action', () => {
      const reducer = searchedLinks(initialState, loadSearchedLinksData('123'));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('should return an error', () => {
    it('When dispatching LOAD_SEARCHED_LINKS_FAILED action', () => {
      const reducer = searchedLinks(initialState, loadSearchedLinksDataFailed('error'));
      expect(reducer).toEqual({
        ...initialState,
        error: 'error',
      });
    });
  });

  describe('should return an array of links', () => {
    it('When disaptching LOAD_SEARCHED_LINKS_SUCCESS action', () => {
      const reducer = searchedLinks(initialState, loadSearchedLinksDataSuccess(linksState));
      expect(reducer).toEqual({
        ...initialState,
        data: linksState,
      });
    });
  });
});
