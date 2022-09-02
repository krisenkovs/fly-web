import { Router } from "web/application/Router";
import { useKeycloak } from '@react-keycloak/web';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

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

  return <Router />;
});
