import links, { initialState, LinksState } from '../links';
import loadLinksData, { loadLinksDataFailed, loadLinksDataSuccess } from '../../actions/loadLinksData/loadLinksData';
import { linksState } from '../../../mocks/store/constants';

const loadingState: LinksState = {
  ...initialState,
  loading: true,
};

describe('links reducer', () => {
  describe('should return loading=true', () => {
    it('When dispatching LOAD_LINKS_DATA action', () => {
      const userToken = '123';
      const reducer = links(initialState, loadLinksData(userToken));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('should return an error', () => {
    it('When dispatching LOAD_LINKS_FAILED action', () => {
      const reducer = links(loadingState, loadLinksDataFailed('error'));
      expect(reducer).toEqual({
        ...initialState,
        error: 'error',
      });
    });
  });

  describe('should return an array of links', () => {
    it('When disaptching LOAD_LINKS_SUCCESS action', () => {
      const reducer = links(loadingState, loadLinksDataSuccess(linksState));
      expect(reducer).toEqual({
        ...initialState,
        data: linksState,
      });
    });
  });
});
