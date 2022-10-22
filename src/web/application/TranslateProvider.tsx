import { store } from './store';
import { observer } from 'mobx-react-lite';
import React, { createContext, PropsWithChildren, useCallback, useContext } from 'react';

const TranslateContext = createContext<(key: string) => string>(() => '');

export const TranslateProvider = observer(({ children }: PropsWithChildren) => {
  const t = useCallback(
    (key: string) => {
      let item: any = store.translate;
      key.split('.').forEach((path) => {
        if (typeof item === 'object' && item?.[path]) {
          item = item?.[path];
        } else {
          return item;
        }
      });

      if (typeof item === 'string') {
        return item;
      }

      return key;
    },
    [store.translate],
  );

  return <TranslateContext.Provider value={t}>{children}</TranslateContext.Provider>;
});

export function useTranslate() {
  return useContext(TranslateContext);
}
