import { call, put } from 'redux-saga/effects';
import loadLinksData, { loadLinksDataSuccess } from '../../actions/loadLinksData/loadLinksData';
import {
  getUserLink, getUserLinks, getEditLink, addUserLink,
} from '../linksWorker';
import { testLink, userData } from '../../../mocks/store/constants';
import {
  fetchLinks, fetchLink, fetchLinkEdit, fetchNewLink,
} from '../api/links.api';
import loadLinkData, { loadLinkDataSuccess } from '../../actions/loadLinkData/loadLinkData';
import editLinkData, { editLinkDataSuccess } from '../../actions/editLinkData/editLinkData';
import addLink, { addLinkSuccess } from '../../actions/addLink/addLink';

const links = [
  testLink,
];

const link = {
  data: testLink,
};

const loadLink = {
  id: '123',
  token: '123',
};

const editData = {
  code: '12',
  description: '',
  tags: [],
  token: '123',
};

const newLink = {
  from: '12',
};

describe('get user links saga', () => {
  it('should put links in store', () => {
    const data = links;
    const g = getUserLinks(loadLinksData(userData.token));

    expect(g.next().value).toEqual(call(fetchLinks, userData.token));
    expect(g.next(data).value).toEqual(put(loadLinksDataSuccess(data)));
    expect(g.next().done).toBe(true);
  });
});

describe('get user link saga', () => {
  it('should put link in store', () => {
    const data = link;
    const g = getUserLink(loadLinkData(loadLink));

    expect(g.next().value).toEqual(call(fetchLink, loadLink));
    expect(g.next(data).value).toEqual(put(loadLinkDataSuccess(data)));
    expect(g.next().done).toBe(true);
  });
});

describe('edit link saga', () => {
  it('should put edited link in store', () => {
    const data = link;
    const g = getEditLink(editLinkData(editData));

    expect(g.next().value).toEqual(call(fetchLinkEdit, editData));
    expect(g.next(data).value).toEqual(put(editLinkDataSuccess(data)));
    expect(g.next().done).toBe(true);
  });
});

describe('add link saga', () => {
  it('should put new link in store', () => {
    const data = link;
    const g = addUserLink(addLink(newLink));

    expect(g.next().value).toEqual(call(fetchNewLink, newLink));
    expect(g.next(data).value).toEqual(put(addLinkSuccess(data)));
    expect(g.next().done).toBe(true);
  });
});
