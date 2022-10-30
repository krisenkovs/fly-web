import { CONNECTOR } from 'web/pages/CarPage/ConnectorModal/types';

export type CarType = {
  id: number;
  brand: string;
  connectorType: CONNECTOR;
  batteryCapacity: number;
  powerReserve: number;
};
