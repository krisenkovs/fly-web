import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { action, makeObservable, observable, reaction, runInAction } from 'mobx';
import { httpService } from 'web/services/HTTPService';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { Page, ProfileType, StationType, TransactionType } from 'web/types';
import { Translate } from 'web/types/translate';

class Store {
  currentTransactionPromise?: PromiseObserver<TransactionType> = undefined;
  profilePromise?: PromiseObserver<ProfileType> = undefined;
  keycloak?: KeycloakInstance = undefined;

  translate?: Translate = undefined;

  constructor() {
    makeObservable(this, {
      keycloak: observable,
      currentTransactionPromise: observable,
      profilePromise: observable,
      translate: observable,
      init: action.bound,
      loadCurrentTransaction: action.bound,
      loadProfile: action.bound,
      stopTransaction: action.bound,

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

  loadCurrentTransaction() {
    this.currentTransactionPromise = fromPromise(
      httpService.get(`${API.TRANSACTION}/current`),
      this.currentTransactionPromise?.value,
    );
  }

  stopTransaction() {
    this.currentTransactionPromise = fromPromise(httpService.post(`/api/transaction/stop`, {}));
  }

  destroy() {
    this.currentTransactionPromise = undefined;
    this.profilePromise = undefined;
    this.keycloak = undefined;
  }
}

export const store = new Store();
