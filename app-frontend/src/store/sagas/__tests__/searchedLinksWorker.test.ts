import { runSaga } from 'redux-saga';
import loadSearchedLinkData, { LinkActionTypes, loadSearchedLinkDataFailed, loadSearchedLinkDataSuccess } from '../../actions/loadSearchedLinkData/loadSearchedLinkData';
import { getSearchedLink, getSearchedLinks } from '../searchedLinksWorker';
import {
  linkState, loadLink, linksState, mockError,
} from '../../../mocks/store/constants';
import * as api from '../../../api/links.api';
import loadSearchedLinksData, { LinksActionTypes, loadSearchedLinksDataFailed, loadSearchedLinksDataSuccess } from '../../actions/loadSearchedLinksData/loadSearchedLinksData';

describe('get searched link saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should put searched link in store', async () => {
    const fetchLink = jest.spyOn(api, 'fetchSearchedLink')
      .mockImplementation(() => Promise.resolve(linkState));
    const dispatched: LinkActionTypes[] = [];
    await runSaga({
      dispatch: (action: LinkActionTypes) => dispatched.push(action),
    }, getSearchedLink, loadSearchedLinkData(loadLink.id)).toPromise();

    expect(fetchLink).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loadSearchedLinkDataSuccess(linkState));
  });

  it('should throw an error in catch block', async () => {
    const fetchLink = jest.spyOn(api, 'fetchSearchedLink')
      .mockImplementation(() => Promise.reject(mockError.message));
    const dispatched: LinkActionTypes[] = [];
    await runSaga({
      dispatch: (action: LinkActionTypes) => dispatched.push(action),
    }, getSearchedLink, loadSearchedLinkData(loadLink.id)).toPromise();

    expect(fetchLink).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loadSearchedLinkDataFailed(mockError.message));
  });
});

describe('get searched links saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const tag = 'hi';

  it('should put searched links in store', async () => {
    const fetchLinks = jest.spyOn(api, 'fetchSearchedLinks')
      .mockImplementation(() => Promise.resolve(linksState));
    const dispatched: LinksActionTypes[] = [];
    await runSaga({
      dispatch: (action: LinksActionTypes) => dispatched.push(action),
    }, getSearchedLinks, loadSearchedLinksData(tag)).toPromise();

    expect(fetchLinks).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loadSearchedLinksDataSuccess(linksState));
  });

  it('should throw an error in catch block', async () => {
    const fetchLinks = jest.spyOn(api, 'fetchSearchedLinks')
      .mockImplementation(() => Promise.reject(mockError.message));
    const dispatched: LinksActionTypes[] = [];
    await runSaga({
      dispatch: (action: LinksActionTypes) => dispatched.push(action),
    }, getSearchedLinks, loadSearchedLinksData(tag)).toPromise();

    expect(fetchLinks).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loadSearchedLinksDataFailed(mockError.message));
  });
});
