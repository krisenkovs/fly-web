export type TransactionType = {
  id: number;
  connectorId: number;
  chargeStationId: number;
  initAmount: number;
  finalAmount: number;
  initPrice: number;
  finalPrice: number;
  startTime: string;
  stopTime: string;
  userId: string;
  startValue: number;
  status: TRANSACTION_STATUS;
  created: string;
  externalId: string;
  errorMessage: TRANSACTION_STATUS;
  powerImport: number;
  startEnergyImport: number;
  currentEnergyImport: number;
  lastEvEnergyPercent: number;
  stationAddress?: string;
};

export enum TRANSACTION_STATUS {
  CREATED = 'CREATED',
  ACTIVE = 'ACTIVE',
  STOPPED = 'STOPPED',
  ERROR = 'ERROR',
  CLOSED = 'CLOSED',
}
