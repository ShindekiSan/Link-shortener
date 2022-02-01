import searchedLinks, { initialState, SearchedLinksState } from '../searchedLinks';
import loadSearchedLinksData, { loadSearchedLinksDataFailed, loadSearchedLinksDataSuccess } from '../../actions/loadSearchedLinksData/loadSearchedLinksData';
import { linksState } from '../../../mocks/store/constants';

const loadingState: SearchedLinksState = {
  ...initialState,
  loading: true,
};

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
      const reducer = searchedLinks(loadingState, loadSearchedLinksDataFailed('error'));
      expect(reducer).toEqual({
        ...initialState,
        error: 'error',
      });
    });
  });

  describe('should return an array of links', () => {
    it('When disaptching LOAD_SEARCHED_LINKS_SUCCESS action', () => {
      const reducer = searchedLinks(loadingState, loadSearchedLinksDataSuccess(linksState));
      expect(reducer).toEqual({
        ...initialState,
        data: linksState,
      });
    });
  });
});
