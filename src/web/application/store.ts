import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { action, makeObservable, observable,  runInAction } from 'mobx';
import { httpService } from 'web/services/HTTPService';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { ProfileType } from 'web/types';
import { Translate } from 'web/types/translate';

class Store {
  profilePromise?: PromiseObserver<ProfileType> = undefined;
  keycloak?: KeycloakInstance = undefined;

  translate?: Translate = undefined;

  constructor() {
    makeObservable(this, {
      keycloak: observable,
      profilePromise: observable,
      translate: observable,
      init: action.bound,
      loadProfile: action.bound,
      destroy: action.bound,
    });
  }

  async init() {
    fetch('locales/ru.json')
      .then((value) => {
        return value.json();
      })
      .then((translate) => {
        runInAction(() => (this.translate = translate));
      });
    this.keycloak = Keycloak({
      url: `https://batteryfly.io/auth`,
      realm: 'batteryfly',
      clientId: 'api-dev',
    });
  }

  loadProfile() {
    this.profilePromise = fromPromise(httpService.get(`${API.USER}/profile`), this.profilePromise?.value);
  }

  destroy() {
    this.profilePromise = undefined;
    this.keycloak = undefined;
  }
}

export const store = new Store();
