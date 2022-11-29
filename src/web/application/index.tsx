import { store } from './store';
import { AuthClientTokens } from '@react-keycloak/core';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { Loader } from 'components/Loader';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, Suspense } from 'react';
import { Keycloak } from 'web/application/Keycloak';
import { TranslateProvider } from 'web/application/TranslateProvider';
import { httpService } from 'web/services/HTTPService';

export const Application = observer(() => {
  const { init, destroy, keycloak } = store;

  useEffect(() => {
    init();
    return () => {
      destroy;
    };
  }, []);

  const handleTokens = useCallback(async (data: AuthClientTokens) => {
    data?.token && httpService.setToken(data?.token);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <TranslateProvider>
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
      </TranslateProvider>
    </Suspense>
  );
});
