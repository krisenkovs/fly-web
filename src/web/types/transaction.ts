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
  errorMessage: string;
  powerImport: number;
  startEnergyImport: number;
  currentEnergyImport: number;
  lastEvEnergyPercent: number;
  stationAddress?: string;
  maxPowerImport?: number;
  rate?: number;
  currentEnergyPercent?: number;
  paymentType: PAYMENT_TYPE;
  percLimit?: number;
  refundAmount?: number;
};

export enum PAYMENT_TYPE {
  CARD = 'CARD',
  AMOUNT = 'AMOUNT',
}

export enum TRANSACTION_STATUS {
  CREATED = 'CREATED',
  ACTIVE = 'ACTIVE',
  STOPPED = 'STOPPED',
  ERROR = 'ERROR',
  CLOSED = 'CLOSED',
  CLOSING = 'CLOSING',
}
