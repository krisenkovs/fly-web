import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { wsService } from 'web/services/WSService';
import { AccountType, CardType, CarType, ProfileType } from 'web/types';
import { Translate } from 'web/types/translate';

class Store {
  profilePromise?: PromiseObserver<ProfileType> = undefined;
  saveProfilePromise?: PromiseObserver<void> = undefined;
  cardPromise?: PromiseObserver<CardType> = undefined;
  carPromise?: PromiseObserver<CarType> = undefined;
  accountPromise?: PromiseObserver<AccountType> = undefined;
  keycloak?: KeycloakInstance = undefined;
  promptInstall?: any = undefined;

  translate?: Translate = undefined;

  constructor() {
    makeObservable(this, {
      keycloak: observable,
      profilePromise: observable,
      saveProfilePromise: observable,
      cardPromise: observable,
      carPromise: observable,
      accountPromise: observable,
      translate: observable,
      promptInstall: observable,
      init: action.bound,
      loadProfile: action.bound,
      saveProfile: action.bound,
      loadCard: action.bound,
      loadAccount: action.bound,
      loadCarInfo: action.bound,
      setPromptInstall: action.bound,
      destroy: action.bound,
    });
  }

  setPromptInstall(value: any) {
    this.promptInstall = value;
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

  saveProfile(values?: ProfileType) {
    this.saveProfilePromise = fromPromise(httpService.put(`${API.USER}/profile`, values));
  }

  loadCard() {
    this.cardPromise = fromPromise(httpService.get(`${API.USER}/payment-card`), this.cardPromise?.value);
  }

  loadAccount() {
    this.accountPromise = fromPromise(httpService.get(API.ACCOUNT), this.accountPromise?.value);
  }

  loadCarInfo() {
    this.carPromise = fromPromise(httpService.get(API.CAR), this.carPromise?.value);
  }

  destroy() {
    this.profilePromise = undefined;
    this.cardPromise = undefined;
    this.saveProfilePromise = undefined;
    this.keycloak = undefined;
    this.accountPromise = undefined;
    this.carPromise = undefined;
    wsService.disconnect();
  }
}

export const store = new Store();
