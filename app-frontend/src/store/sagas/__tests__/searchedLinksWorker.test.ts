import { call, put } from 'redux-saga/effects';
import loadSearchedLinkData, { loadSearchedLinkDataFailed, loadSearchedLinkDataSuccess } from '../../actions/loadSearchedLinkData/loadSearchedLinkData';
import { getSearchedLink, getSearchedLinks } from '../searchedLinksWorker';
import {
  linkState, loadLink, linksState, mockError,
} from '../../../mocks/store/constants';
import { fetchSearchedLink, fetchSearchedLinks } from '../api/links.api';
import loadSearchedLinksData, { loadSearchedLinksDataFailed, loadSearchedLinksDataSuccess } from '../../actions/loadSearchedLinksData/loadSearchedLinksData';

describe('get searched link saga', () => {
  const { id } = loadLink;
  const data = linkState;

  it('should put searched link in store', () => {
    const g = getSearchedLink(loadSearchedLinkData(id));

    expect(g.next().value).toEqual(call(fetchSearchedLink, id));
    expect(g.next(data).value).toEqual(put(loadSearchedLinkDataSuccess(data)));
    expect(g.next().done).toBe(true);
  });

  it('should throw an error in catch block', () => {
    const g = getSearchedLink(loadSearchedLinkData(id));

    g.next();
    expect(g.throw(
      mockError.message,
    ).value).toEqual(put(loadSearchedLinkDataFailed(mockError.message)));
    expect(g.next().done).toBe(true);
  });
});

describe('get searched links saga', () => {
  const tag = 'hi';
  const data = linksState;

  it('should put searched links in store', () => {
    const g = getSearchedLinks(loadSearchedLinksData(tag));

    expect(g.next().value).toEqual(call(fetchSearchedLinks, tag));
    expect(g.next(data).value).toEqual(put(loadSearchedLinksDataSuccess(data)));
    expect(g.next().done).toBe(true);
  });

  it('should throw an error in catch block', () => {
    const g = getSearchedLinks(loadSearchedLinksData(tag));

    g.next();
    expect(g.throw(
      mockError.message,
    ).value).toEqual(put(loadSearchedLinksDataFailed(mockError.message)));
    expect(g.next().done).toBe(true);
  });
});
