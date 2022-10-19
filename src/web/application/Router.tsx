import { store } from './store';
import { Box } from 'components/Box';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react';
import { matchPath, Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from 'web/constant';
import { AboutPage } from 'web/pages/AboutPage';
import { CarPage } from 'web/pages/CarPage';
import { CardPage } from 'web/pages/CardPage';
import { CardsPage } from 'web/pages/CardsPage';
import { ChargePage } from 'web/pages/ChargePage';
import { HelpPage } from 'web/pages/HelpPage';
import { HistoryPage } from 'web/pages/HistoryPage';
import { MainPage } from 'web/pages/MainPage';
import { NotificationPage } from 'web/pages/NotificationPage';
import { PayErrorPage } from 'web/pages/PayErrorPage';
import { PayPage } from 'web/pages/PayPage';
import { PaymentPage } from 'web/pages/PaymentPage';
import { ProfilePage } from 'web/pages/ProfilePage';
import { ScannerPage } from 'web/pages/ScannerPage';
import { SettingsPage } from 'web/pages/SettingsPage';
import { StationPage } from 'web/pages/StationPage';

export const Router = observer(() => {
  const { pathname } = useLocation();

  const route = useMemo(
    () => Object.values(ROUTES).find((item) => matchPath(pathname, { path: item, exact: true })),
    [pathname],
  );

  const match = useMemo(() => matchPath(pathname, { path: route, exact: true }), [route]);

  useEffect(() => {
    store.loadStations();
    store.loadCard();
  }, []);

  useEffect(() => {
    if ([ROUTES.STATION, ROUTES.PAYMENT, ROUTES.PAY].includes(match?.path as ROUTES)) {
      const params: { stationId?: number } = match?.params || {};
      params?.stationId && store.loadConnectors(params?.stationId);
    }
  }, [match]);

  return (
    <Box flex={1} overflow="hidden">
      <Switch>
        <Route path={ROUTES.MAIN} exact component={MainPage} />
        <Route path={ROUTES.STATION} exact component={StationPage} />
        <Route path={ROUTES.PAYMENT} exact component={PaymentPage} />
        <Route path={ROUTES.PAY} exact component={PayPage} />
        <Route path={ROUTES.CHARGE} component={ChargePage} />
        <Route path={ROUTES.PAY_ERROR} component={PayErrorPage} />
        <Route path={ROUTES.PROFILE} component={ProfilePage} />
        <Route path={ROUTES.SCANNER} component={ScannerPage} />
        <Route path={ROUTES.SETTINGS} component={SettingsPage} />
        <Route path={ROUTES.CARD} component={CardPage} />
        <Route path={ROUTES.HISTORY} component={HistoryPage} />
        <Route path={ROUTES.CAR} component={CarPage} />
        <Route path={ROUTES.HELP} component={HelpPage} />
        <Route path={ROUTES.ABOUT} component={AboutPage} />
        <Route path={ROUTES.CARDS} component={CardsPage} />
        <Route path={ROUTES.NOTIFICATION} component={NotificationPage} />
      </Switch>
    </Box>
  );
});
