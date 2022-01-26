import { runSaga } from 'redux-saga';
import loadLinksData, { loadLinksDataFailed, loadLinksDataSuccess } from '../../actions/loadLinksData/loadLinksData';
import {
  getUserLink, getUserLinks, getEditLink, addUserLink,
} from '../linksWorker';
import {
  userData, loadLink, editData, mockError, linkState, linksState,
} from '../../../mocks/store/constants';
import * as api from '../../../api/links.api';
import loadLinkData, { loadLinkDataFailed, loadLinkDataSuccess } from '../../actions/loadLinkData/loadLinkData';
import editLinkData, { editLinkDataFailed, editLinkDataSuccess } from '../../actions/editLinkData/editLinkData';
import addLink, { addLinkFailed, addLinkSuccess } from '../../actions/addLink/addLink';
import { LinkAction } from '../../../mocks/store/actionTypes';

const newLink = {
  from: '12',
};

describe('get user links saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const data = linksState;

  it('should put links in store', async () => {
    const fetchLinks = jest.spyOn(api, 'fetchLinks')
      .mockImplementation(() => Promise.resolve(data));
    const dispatched: LinkAction[] = [];
    await runSaga({
      dispatch: (action: LinkAction) => dispatched.push(action),
    }, getUserLinks, loadLinksData(userData.token)).toPromise();

    expect(fetchLinks).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loadLinksDataSuccess(data));
  });

  it('should throw an error in catch block', async () => {
    const fetchLinks = jest.spyOn(api, 'fetchLinks')
      .mockImplementation(() => Promise.reject(mockError.message));
    const dispatched: LinkAction[] = [];
    await runSaga({
      dispatch: (action: LinkAction) => dispatched.push(action),
    }, getUserLinks, loadLinksData(userData.token)).toPromise();

    expect(fetchLinks).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loadLinksDataFailed(mockError.message));
  });
});

describe('get user link saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const data = linkState;

  it('should put link in store', async () => {
    const fetchLink = jest.spyOn(api, 'fetchLink')
      .mockImplementation(() => Promise.resolve(data));
    const dispatched: LinkAction[] = [];
    await runSaga({
      dispatch: (action: LinkAction) => dispatched.push(action),
    }, getUserLink, loadLinkData(loadLink)).toPromise();

    expect(fetchLink).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loadLinkDataSuccess(data));
  });

  it('should throw an error in catch block', async () => {
    const fetchLink = jest.spyOn(api, 'fetchLink')
      .mockImplementation(() => Promise.reject(mockError.message));
    const dispatched: LinkAction[] = [];
    await runSaga({
      dispatch: (action: LinkAction) => dispatched.push(action),
    }, getUserLink, loadLinkData(loadLink)).toPromise();

    expect(fetchLink).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(loadLinkDataFailed(mockError.message));
  });
});

describe('edit link saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const data = linkState;

  it('should put edited link in store', async () => {
    const fetchLink = jest.spyOn(api, 'fetchLinkEdit')
      .mockImplementation(() => Promise.resolve(data));
    const dispatched: LinkAction[] = [];
    await runSaga({
      dispatch: (action: LinkAction) => dispatched.push(action),
    }, getEditLink, editLinkData(editData)).toPromise();

    expect(fetchLink).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(editLinkDataSuccess(data));
  });

  it('should throw an error in catch block', async () => {
    const fetchLink = jest.spyOn(api, 'fetchLinkEdit')
      .mockImplementation(() => Promise.reject(mockError.message));
    const dispatched: LinkAction[] = [];
    await runSaga({
      dispatch: (action: LinkAction) => dispatched.push(action),
    }, getEditLink, editLinkData(editData)).toPromise();

    expect(fetchLink).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(editLinkDataFailed(mockError.message));
  });
});

describe('add link saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const data = linkState;

  it('should put new link in store', async () => {
    const fetchLink = jest.spyOn(api, 'fetchNewLink')
      .mockImplementation(() => Promise.resolve(data));
    const dispatched: LinkAction[] = [];
    await runSaga({
      dispatch: (action: LinkAction) => dispatched.push(action),
    }, addUserLink, addLink(newLink)).toPromise();

    expect(fetchLink).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(addLinkSuccess(data));
  });

  it('should throw an error in catch block', async () => {
    const fetchLink = jest.spyOn(api, 'fetchNewLink')
      .mockImplementation(() => Promise.reject(mockError.message));
    const dispatched: LinkAction[] = [];
    await runSaga({
      dispatch: (action: LinkAction) => dispatched.push(action),
    }, addUserLink, addLink(newLink)).toPromise();

    expect(fetchLink).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(addLinkFailed(mockError.message));
  });
});
