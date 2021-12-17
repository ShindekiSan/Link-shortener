import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

interface AuthHook {
  login: (jwtToken: string, id: string, name: string) => void,
  logout: () => void,
  token: string | null,
  userId: string | null,
  userName: string | null,
}

function useAuth():AuthHook {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const login = useCallback((jwtToken: string, id: string, name: string) => {
    setToken(jwtToken);
    setUserId(id);
    setUserName(name);

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, userName: name,
    }));
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) || '{}');
    if (data && data.token) {
      login(data.token, data.userId, data.userName);
    }
  }, [login]);

  return {
    login, logout, token, userId, userName,
  };
}

export default useAuth;
