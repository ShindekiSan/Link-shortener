import { call, put } from 'redux-saga/effects';
import loadLinksData, { loadLinksDataFailed, loadLinksDataSuccess } from '../../actions/loadLinksData/loadLinksData';
import {
  getUserLink, getUserLinks, getEditLink, addUserLink,
} from '../linksWorker';
import {
  userData, loadLink, editData, mockError, linkState, linksState,
} from '../../../mocks/store/constants';
import {
  fetchLinks, fetchLink, fetchLinkEdit, fetchNewLink,
} from '../api/links.api';
import loadLinkData, { loadLinkDataFailed, loadLinkDataSuccess } from '../../actions/loadLinkData/loadLinkData';
import editLinkData, { editLinkDataFailed, editLinkDataSuccess } from '../../actions/editLinkData/editLinkData';
import addLink, { addLinkFailed, addLinkSuccess } from '../../actions/addLink/addLink';

const newLink = {
  from: '12',
};

describe('get user links saga', () => {
  const data = linksState;

  it('should put links in store', () => {
    const g = getUserLinks(loadLinksData(userData.token));

    expect(g.next().value).toEqual(call(fetchLinks, userData.token));
    expect(g.next(data).value).toEqual(put(loadLinksDataSuccess(data)));
    expect(g.next().done).toBe(true);
  });

  it('should throw an error in catch block', () => {
    const g = getUserLinks(loadLinksData(userData.token));

    g.next();
    expect(g.throw(mockError.message).value).toEqual(put(loadLinksDataFailed(mockError.message)));
    expect(g.next().done).toBe(true);
  });
});

describe('get user link saga', () => {
  const data = linkState;

  it('should put link in store', () => {
    const g = getUserLink(loadLinkData(loadLink));

    expect(g.next().value).toEqual(call(fetchLink, loadLink));
    expect(g.next(data).value).toEqual(put(loadLinkDataSuccess(data)));
    expect(g.next().done).toBe(true);
  });

  it('should throw an error in catch block', () => {
    const g = getUserLink(loadLinkData(loadLink));

    g.next();
    expect(g.throw(mockError.message).value).toEqual(put(loadLinkDataFailed(mockError.message)));
    expect(g.next().done).toBe(true);
  });
});

describe('edit link saga', () => {
  const data = linkState;

  it('should put edited link in store', () => {
    const g = getEditLink(editLinkData(editData));

    expect(g.next().value).toEqual(call(fetchLinkEdit, editData));
    expect(g.next(data).value).toEqual(put(editLinkDataSuccess(data)));
    expect(g.next().done).toBe(true);
  });

  it('should throw an error in catch block', () => {
    const g = getEditLink(editLinkData(editData));

    g.next();
    expect(g.throw(mockError.message).value).toEqual(put(editLinkDataFailed(mockError.message)));
    expect(g.next().done).toBe(true);
  });
});

describe('add link saga', () => {
  const data = linkState;

  it('should put new link in store', () => {
    const g = addUserLink(addLink(newLink));

    expect(g.next().value).toEqual(call(fetchNewLink, newLink));
    expect(g.next(data).value).toEqual(put(addLinkSuccess(data)));
    expect(g.next().done).toBe(true);
  });

  it('should throw an error in catch block', () => {
    const g = addUserLink(addLink(newLink));

    g.next();
    expect(g.throw(mockError.message).value).toEqual(put(addLinkFailed(mockError.message)));
    expect(g.next().done).toBe(true);
  });
});
