import { useMemo } from 'react';
import {store} from'web/application/store'

export function useStation(stationId?:number){
  return useMemo(() => {
    return store.stationsPromise?.value?.content?.find(
      (item) => item?.id === stationId,
    );
  }, [store.currentTransactionPromise?.value, stationId]);
}