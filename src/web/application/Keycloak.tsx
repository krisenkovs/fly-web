import { useKeycloak } from '@react-keycloak/web';
import { Loader } from 'components/Loader';
import { observer } from 'mobx-react-lite';
import React, { useEffect, Suspense } from 'react';
import { Router } from 'web/application/Router';
import { store } from 'web/application/store';
import { VerifyPage } from 'web/pages/VerifyPage';

export const Keycloak = observer(() => {
  const {
    keycloak: { authenticated, login },
  } = useKeycloak();

  useEffect(() => {
    if (!authenticated) {
      login();
    } else {
      store.loadProfile();
    }
  }, [authenticated]);

  if (!authenticated || !store.profilePromise?.value) {
    return null;
  }

  return (
    <Suspense fallback={<Loader />}>
      {store?.profilePromise?.value?.isValidatedPhone ? <Router /> : <VerifyPage />}
    </Suspense>
  );
});
