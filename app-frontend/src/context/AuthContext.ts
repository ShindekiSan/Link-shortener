import { createContext } from 'react';

export interface ContextValue {
  token: string | null,
  userName: string | null,
  userId: string | null,
  login: Function,
  logout: Function,
  isAuthenticated: boolean
}

function noop() {}

const AuthContext = createContext<ContextValue>({
  token: null,
  userName: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});

export default AuthContext;
