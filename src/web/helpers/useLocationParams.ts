import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useLocationParams = (): URLSearchParams => {
  const { search } = useLocation();

  return useMemo(() => {
    const params = new URLSearchParams(search);

    return params;
  }, [search]);
};
