export type ConnectorType = {
  id: number;
  chargeStationId: number;
  externalId: number;
  availability: boolean;
  status: string;
  created: string;
  type: CONNECTOR;
};

export enum CONNECTOR {
  CSS = 'CSS',
  CSHdeMO = 'CSHdeMO',
}
