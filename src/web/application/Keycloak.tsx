import { useKeycloak } from '@react-keycloak/web';
import { Loader } from "components/Loader";
import { observer } from 'mobx-react-lite';
import React, { useEffect, Suspense } from 'react';
import { Router } from 'web/application/Router';

export const Keycloak = observer(() => {
  const {
    keycloak: { authenticated, login },
  } = useKeycloak();

  useEffect(() => {
    if (!authenticated) {
      login();
    }
  }, [authenticated, login]);

  if (!authenticated) {
    return null;
  }

  return (
    <Suspense fallback={<Loader/>}>
      <Router />
    </Suspense>
  );
});
