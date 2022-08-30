import { container } from '../container';
import { store } from './store';
import { AuthClientTokens } from '@react-keycloak/core';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { Box } from 'components/Box';
import { Loader } from 'components/Loader';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, Suspense } from 'react';
import { RoutedApplication } from 'web/application/RoutedApplication';

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
          <RoutedApplication />
        </ReactKeycloakProvider>
      )}
    </Suspense>
  );
});
