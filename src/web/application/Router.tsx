import { Box } from 'components/Box';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { store } from 'web/application/store';
import { ROUTES } from 'web/constant';
import { AboutPage } from 'web/pages/AboutPage';
import { CarPage } from 'web/pages/CarPage';
import { CardsPage } from 'web/pages/CardsPage';
import { ChargePage } from 'web/pages/ChargePage';
import { HelpPage } from 'web/pages/HelpPage';
import { HistoryPage } from 'web/pages/HistoryPage';
import { MainPage } from 'web/pages/MainPage';
import { NotificationPage } from 'web/pages/NotificationPage';
import { PayErrorPage } from 'web/pages/PayErrorPage';
import { ProfilePage } from 'web/pages/ProfilePage';
import { ScannerPage } from 'web/pages/ScannerPage';
import { SettingsPage } from 'web/pages/SettingsPage';
import { StationPage } from 'web/pages/StationPage';
import { VerifyPage } from 'web/pages/VerifyPage';

export const Router = observer(() => {
  useEffect(() => {
    store.loadProfile();
    store.loadCard();
    store.loadAccount();
    store.loadCarInfo();
  }, []);

  if (!store.profilePromise?.value) {
    return null;
  }

  return (
    <Box flex={1} overflow="hidden">
      {store.profilePromise?.value?.isValidatedPhone ? (
        <Switch>
          <Route path={ROUTES.MAIN} exact component={MainPage} />
          <Route path={ROUTES.STATION} component={StationPage} />

          <Route path={ROUTES.CHARGE} component={ChargePage} />
          <Route path={ROUTES.PAY_ERROR} component={PayErrorPage} />
          <Route path={ROUTES.PROFILE} component={ProfilePage} />
          <Route path={ROUTES.SCANNER} component={ScannerPage} />
          <Route path={ROUTES.SETTINGS} component={SettingsPage} />
          <Route path={ROUTES.HISTORY} component={HistoryPage} />
          <Route path={ROUTES.CAR} component={CarPage} />
          <Route path={ROUTES.HELP} component={HelpPage} />
          <Route path={ROUTES.ABOUT} component={AboutPage} />
          <Route path={ROUTES.CARDS} component={CardsPage} />
          <Route path={ROUTES.NOTIFICATION} component={NotificationPage} />
        </Switch>
      ) : (
        <VerifyPage />
      )}
    </Box>
  );
});
