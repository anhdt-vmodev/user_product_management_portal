import { Storage } from 'aws-amplify';
import { useEffect, useMemo, useState } from 'react';

interface useGetFileParams {
  key: string;
}
export const useGetFile = ({ key }: useGetFileParams) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>('');

  useEffect(() => {
    (async () => {
      if (!key) {
        return;
      }
      try {
        setLoading(true);
        const data = await Storage.get(key);
        if (data) {
          setUrl(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [key]);

  const result = useMemo(() => {
    return {
      url,
      loading,
      error,
    };
  }, [url, loading, error]);
  return result;
};
