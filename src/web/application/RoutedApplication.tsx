import { store } from './store';
import { useKeycloak } from '@react-keycloak/web';
import { Box } from 'components/Box';
import { Loader } from 'components/Loader';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { ROUTES } from 'web/constant';
import { ChargePage } from 'web/pages/ChargePage';
import { MainPage } from 'web/pages/MainPage';
import { PayErrorPage } from 'web/pages/PayErrorPage';
import { PayPage } from 'web/pages/PayPage';
import { PaymentPage } from 'web/pages/PaymentPage';
import { ProfilePage } from 'web/pages/ProfilePage';
import { ScannerPage } from 'web/pages/ScannerPage';
import { SettingsPage } from 'web/pages/SettingsPage';
import { StationPage } from 'web/pages/StationPage';


export const RoutedApplication = observer(() => {
  const {
    keycloak: { authenticated, login },
  } = useKeycloak();

  useEffect(() => {
    if (!authenticated) {
      login();
    } else {
      store.loadStations();
      store.loadProfile();
      store.loadCurrentTransaction();
    }
  }, [authenticated, login]);

  if (store.stationsPromise?.pending || store.profilePromise?.pending) {
    return <Loader />;
  }

  if (!authenticated || !store.stationsPromise?.fulfilled || !store.profilePromise?.fulfilled) {
    return null;
  }

  return (
    <Box flex={1}>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.STATION} element={<StationPage />} />
        <Route path={ROUTES.PAYMENT} element={<PaymentPage />} />
        <Route path={ROUTES.PAY} element={<PayPage />} />
        <Route path={ROUTES.PAY_ERROR} element={<PayPage />} />
        <Route path={ROUTES.CHARGE} element={<ChargePage />} />
        <Route path={ROUTES.PAY_ERROR} element={<PayErrorPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.SCANNER} element={<ScannerPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
      </Routes>
    </Box>
  );
});