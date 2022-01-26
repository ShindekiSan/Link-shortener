import { runSaga } from 'redux-saga';
import loadSearchedLinkData, { loadSearchedLinkDataFailed, loadSearchedLinkDataSuccess } from '../../actions/loadSearchedLinkData/loadSearchedLinkData';
import { getSearchedLink, getSearchedLinks } from '../searchedLinksWorker';
import {
  linkState, loadLink, linksState, mockError,
} from '../../../mocks/store/constants';
import * as api from '../../../api/links.api';
import loadSearchedLinksData, { loadSearchedLinksDataFailed, loadSearchedLinksDataSuccess } from '../../actions/loadSearchedLinksData/loadSearchedLinksData';
import { SearchedLinkAction } from '../../../mocks/store/actionTypes';

describe('get searched link saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const { id } = loadLink;
  const data = linkState;

  it('should put searched link in store', async () => {
    const fetchLink = jest.spyOn(api, 'fetchSearchedLink')
      .mockImplementation(() => Promise.resolve(data));
    const dispatched: SearchedLinkAction[] = [];
    await runSaga({
      dispatch: (action: SearchedLinkAction) => dispatched.push(action),
    }, getSearchedLink, loadSearchedLinkData(id)).toPromise();

    expect(fetchLink).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loadSearchedLinkDataSuccess(data));
  });

  it('should throw an error in catch block', async () => {
    const fetchLink = jest.spyOn(api, 'fetchSearchedLink')
      .mockImplementation(() => Promise.reject(mockError.message));
    const dispatched: SearchedLinkAction[] = [];
    await runSaga({
      dispatch: (action: SearchedLinkAction) => dispatched.push(action),
    }, getSearchedLink, loadSearchedLinkData(id)).toPromise();

    expect(fetchLink).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loadSearchedLinkDataFailed(mockError.message));
  });
});

describe('get searched links saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const tag = 'hi';
  const data = linksState;

  it('should put searched links in store', async () => {
    const fetchLinks = jest.spyOn(api, 'fetchSearchedLinks')
      .mockImplementation(() => Promise.resolve(data));
    const dispatched: SearchedLinkAction[] = [];
    await runSaga({
      dispatch: (action: SearchedLinkAction) => dispatched.push(action),
    }, getSearchedLinks, loadSearchedLinksData(tag)).toPromise();

    expect(fetchLinks).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loadSearchedLinksDataSuccess(data));
  });

  it('should throw an error in catch block', async () => {
    const fetchLinks = jest.spyOn(api, 'fetchSearchedLinks')
      .mockImplementation(() => Promise.reject(mockError.message));
    const dispatched: SearchedLinkAction[] = [];
    await runSaga({
      dispatch: (action: SearchedLinkAction) => dispatched.push(action),
    }, getSearchedLinks, loadSearchedLinksData(tag)).toPromise();

    expect(fetchLinks).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loadSearchedLinksDataFailed(mockError.message));
  });
});
