import { call, put } from 'redux-saga/effects';
import loadSearchedLinkData, { loadSearchedLinkDataSuccess } from '../../actions/loadSearchedLinkData/loadSearchedLinkData';
import { getSearchedLink, getSearchedLinks } from '../searchedLinksWorker';
import { testLink } from '../../../mocks/store/constants';
import { fetchSearchedLink, fetchSearchedLinks } from '../api/links.api';
import loadSearchedLinksData, { loadSearchedLinksDataSuccess } from '../../actions/loadSearchedLinksData/loadSearchedLinksData';

const linkState = {
  data: testLink,
};

const linksState = [
  testLink,
];

const loadLink = {
  id: '123',
};

const loadLinks = {
  tag: 'hi',
};

describe('get searched link saga', () => {
  it('should put searched link in store', () => {
    const { id } = loadLink;
    const data = linkState;
    const g = getSearchedLink(loadSearchedLinkData(id));

    expect(g.next().value).toEqual(call(fetchSearchedLink, id));
    expect(g.next(data).value).toEqual(put(loadSearchedLinkDataSuccess(data)));
    expect(g.next().done).toBe(true);
  });
});

describe('get searched links saga', () => {
  it('should put searched links in store', () => {
    const { tag } = loadLinks;
    const data = linksState;
    const g = getSearchedLinks(loadSearchedLinksData(tag));

    expect(g.next().value).toEqual(call(fetchSearchedLinks, tag));
    expect(g.next(data).value).toEqual(put(loadSearchedLinksDataSuccess(data)));
    expect(g.next().done).toBe(true);
  });
});
