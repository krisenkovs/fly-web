import { useMemo } from 'react';
import { store } from 'web/application/store';

export function useConnector(connectorId?: number) {
  return useMemo(() => {
    return store.connectorsPromise?.value?.find((item) => item?.id === connectorId);
  }, [store.connectorsPromise?.value, connectorId]);
}
