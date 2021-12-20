import { useState, useCallback } from 'react';
import { Link } from '../types/link';
import { UserInterface } from '../types/user';

export interface RequestPromise {
  link: Link,
  links: Link[],
  message: string,
  token: string,
  userId: string,
  userName: string,
  user: UserInterface,
}

interface Headers {
  Authorization?: string,
}

interface HttpHook {
  loading: boolean,
  error: string,
  request: (
    url: string, method?:string, body?:any, headers?: {} | Headers
  ) => Promise<RequestPromise>,
  clearError: () => void,
}

function useHttp():HttpHook {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const request = useCallback(async (url:string, method:string = 'GET', body = null, headers:{} | Headers = {}) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
      const data: RequestPromise = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setLoading(false);

      return data;
    } catch (e) {
      setLoading(false);
      throw e;
    }
  }, []);

  const clearError = useCallback(() => { setError(''); }, []);

  return {
    loading, error, request, clearError,
  };
}

export default useHttp;
