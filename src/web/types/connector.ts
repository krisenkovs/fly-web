export type ConnectorType = {
  id: number;
  chargeStationId: number;
  externalId: number;
  availability: boolean;
  status: STATUS;
  created: string;
  type: CONNECTOR;
};

export enum CONNECTOR {
  CSS = 'CSS',
  CSHdeMO = 'CHAdeMO',
}

export enum STATUS {
  AVAILABLE = 'Available',
  PREPARING = 'Preparing',
}
