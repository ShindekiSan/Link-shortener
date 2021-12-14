import { createContext } from 'react';

interface ContextValue {
  token: null,
  userName: null,
  userId: null,
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
