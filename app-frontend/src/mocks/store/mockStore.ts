import configureStore from 'redux-mock-store';
import { RootState } from '../../store/reducers/root';

export type InitialMockState = Partial<RootState>;

export function createMockStore(state: InitialMockState) { // eslint-disable-line
  const mockStore = configureStore();
  const store = mockStore(state);
  return store;
}
