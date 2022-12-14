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
  CONNECTOR = '/station/:stationId/connector/:connectorId',
  SETTINGS = '/settings',
  CARD = '/card',
  HISTORY = '/history',
  CAR = '/car',
  ABOUT = '/about',
  CARDS = '/cards',
  NOTIFICATION = '/notification',
  BALANCE = '/balance',
}
