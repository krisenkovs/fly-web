import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { AccountType, CardType, CarType, PaidReturnType, ProfileType } from 'web/types';
import { Translate } from 'web/types/translate';

class Store {
  profilePromise?: PromiseObserver<ProfileType> = undefined;
  saveProfilePromise?: PromiseObserver<void> = undefined;
  cardPromise?: PromiseObserver<CardType> = undefined;
  carPromise?: PromiseObserver<CarType> = undefined;
  accountPromise?: PromiseObserver<AccountType> = undefined;
  tieCardPromise?: PromiseObserver<PaidReturnType> = undefined;
  upAccountPromise?: PromiseObserver<PaidReturnType> = undefined;
  keycloak?: KeycloakInstance = undefined;

  translate?: Translate = undefined;

  constructor() {
    makeObservable(this, {
      keycloak: observable,
      profilePromise: observable,
      saveProfilePromise: observable,
      cardPromise: observable,
      carPromise: observable,
      tieCardPromise: observable,
      accountPromise: observable,
      translate: observable,
      upAccountPromise: observable,
      init: action.bound,
      loadProfile: action.bound,
      saveProfile: action.bound,
      loadCard: action.bound,
      loadAccount: action.bound,
      tieCard: action.bound,
      upAccount: action.bound,
      loadCarInfo: action.bound,
      saveCarInfo: action.bound,

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

  saveProfile(values?: ProfileType) {
    this.saveProfilePromise = fromPromise(httpService.put(`${API.USER}/profile`, values));
  }

  loadCard() {
    this.cardPromise = fromPromise(httpService.get(`${API.USER}/payment-card`));
  }

  loadAccount() {
    this.accountPromise = fromPromise(httpService.get(API.ACCOUNT));
  }

  tieCard(path: string) {
    this.tieCardPromise = fromPromise(httpService.post(`${API.TRANSACTION}/tie-card`, { returnUrl: path }));
  }

  upAccount(returnUrl?: string) {
    this.upAccountPromise = fromPromise(
      httpService.post(`${API.TRANSACTION}/pay`, {
        initPrice: 10,
        returnUrl,
        topUp: true,
      }),
    );
  }

  loadCarInfo() {
    this.carPromise = fromPromise(httpService.get(API.CAR));
  }

  saveCarInfo(data: CarType) {
    this.carPromise = fromPromise(data.id ? httpService.put(API.CAR, data) : httpService.post(API.CAR, data));
  }

  destroy() {
    this.profilePromise = undefined;
    this.cardPromise = undefined;
    this.saveProfilePromise = undefined;
    this.tieCardPromise = undefined;
    this.keycloak = undefined;
    this.accountPromise = undefined;
    this.carPromise = undefined;
  }
}

export const store = new Store();
