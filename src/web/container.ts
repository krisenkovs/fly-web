import { HTTPService } from 'web/helpers/HTTPService';

class Container {
  private readonly httpServiceInstance;

  constructor() {
    this.httpServiceInstance = new HTTPService();
  }

  get httpService() {
    return this.httpServiceInstance;
  }

  setToken(token?: string) {
    token && this.httpServiceInstance.updateToken(token);
  }
}

export const container = new Container();