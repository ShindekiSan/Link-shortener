import { useState, useCallback } from 'react';

function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
      const data = await response.json();

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
