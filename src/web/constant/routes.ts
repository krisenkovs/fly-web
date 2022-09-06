export enum ROUTES {
  HOME = '/home',
  PROFILE = '/profile',
  HELP = '/help',
  MAIN = '/',
  PAY = '/station/:stationId/connector/:connectorId/card/:cardId',
  CHARGE = '/charge',
  PAY_ERROR = '/pay-error',
  SCANNER = '/scanner',
  STATION = '/station/:stationId',
  PAYMENT = '/station/:stationId/connector/:connectorId',
  SETTINGS = '/settings',
  CARD = '/card',
  HISTORY='/history'
}
