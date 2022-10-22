import { store } from '../store';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Info } from 'web/pages/StationPage/Connector/Info';
import { Payment } from 'web/pages/StationPage/Connector/Payment';
import { STEPS_CONNECTOR } from 'web/pages/StationPage/types';

export const Connector = observer(() => {
  const { connectorId } = useParams<{ connectorId: string }>();
  const { step, setSelectedConnector, clearSelectedConnector } = store;

  useEffect(() => {
    setSelectedConnector(connectorId);
    return clearSelectedConnector;
  }, [connectorId]);

  switch (step) {
    case STEPS_CONNECTOR.PAYMENT:
      return <Payment />;
    case STEPS_CONNECTOR.INFO:
      return <Info />;
    default:
      return null;
  }
});
