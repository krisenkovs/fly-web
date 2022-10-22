import { store } from './store';
import { AuthClientTokens } from '@react-keycloak/core';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { Loader } from 'components/Loader';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, Suspense } from 'react';
import { httpService } from 'web/services/HTTPService';
import { Keycloak } from 'web/application/Keycloak';

export const Application = observer(() => {
  const { init, destroy, keycloak } = store;

  useEffect(() => {
    init();
    return destroy;
  }, []);

  const handleTokens = useCallback(async (data: AuthClientTokens) => {
    data?.token && httpService.setToken(data?.token);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {keycloak && (
        <ReactKeycloakProvider
          authClient={keycloak}
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
