import { store } from './store';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { ROUTES } from 'web/constant';
import { Connector } from 'web/pages/StationPage/Connector';
import { Station } from 'web/pages/StationPage/Station';

export const StationPage = observer(() => {
  const { stationId } = useParams<{ stationId: string }>();

  const { load, clear, stationPromise, loadConnectors } = store;

  useEffect(() => {
    load(stationId);
    loadConnectors(+stationId);
    return () => {
      clear();
    };
  }, [stationId]);

  if (!stationPromise) {
    return null;
  }

  return (
    <Switch>
      <Route path={ROUTES.STATION} exact component={Station} />
      <Route path={ROUTES.CONNECTOR} exact component={Connector} />
    </Switch>
  );
});
