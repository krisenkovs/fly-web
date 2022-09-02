import { container } from '../container';
import { store } from './store';
import { AuthClientTokens } from '@react-keycloak/core';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { Loader } from 'components/Loader';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, Suspense } from 'react';
import { Keycloak } from 'web/application/Keycloak';

export const Application = observer(() => {
  useEffect(() => {
    store.init();
    return () => store.destroy();
  }, []);

  const handleTokens = useCallback(async (data: AuthClientTokens) => {
    container.setToken(data?.token);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {store.keycloak && (
        <ReactKeycloakProvider
          authClient={store.keycloak}
          onTokens={handleTokens}
          LoadingComponent={<Loader />}
          initOptions={{
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
          }}
        >
          <Keycloak />
        </ReactKeycloakProvider>
      )}
    </Suspense>
  );
});
