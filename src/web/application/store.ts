import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { action, makeObservable, observable, reaction, runInAction } from 'mobx';
import { HTTPService } from 'web/HTTPService';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { CardType, ConnectorType, Page, PaidReturnType, ProfileType, StationType, TransactionType } from 'web/types';
import { Translate } from 'web/types/translate';

class Store {
  protected readonly httpService = new HTTPService();

  stationsPromise?: PromiseObserver<Page<StationType>> = undefined;
  connectorsPromise?: PromiseObserver<ConnectorType[]> = undefined;
  cardPromise?: PromiseObserver<CardType> = undefined;
  tieCardPromise?: PromiseObserver<PaidReturnType> = undefined;
  currentTransactionPromise?: PromiseObserver<TransactionType> = undefined;
  payTransactionPromise?: PromiseObserver<PaidReturnType> = undefined;
  saveProfilePromise?: PromiseObserver<void> = undefined;
  profilePromise?: PromiseObserver<ProfileType> = undefined;
  changePasswordPromise?: PromiseObserver<void> = undefined;
  keycloak?: KeycloakInstance = undefined;
  saveFilePromise?: PromiseObserver<string> = undefined;
  transactionsPromise?: PromiseObserver<Page<TransactionType>> = undefined;
  translate?: Translate = undefined;

  constructor() {
    makeObservable(this, {
      keycloak: observable,
      stationsPromise: observable,
      connectorsPromise: observable,
      currentTransactionPromise: observable,
      profilePromise: observable,
      cardPromise: observable,
      tieCardPromise: observable,
      payTransactionPromise: observable,
      saveProfilePromise: observable,
      saveFilePromise: observable,
      transactionsPromise: observable,
      changePasswordPromise: observable,
      translate: observable,
      init: action.bound,
      loadStations: action.bound,
      loadConnectors: action.bound,
      loadCurrentTransaction: action.bound,
      loadProfile: action.bound,
      loadCard: action.bound,
      tieCard: action.bound,
      stopTransaction: action.bound,
      payTransaction: action.bound,
      clearPaid: action.bound,
      saveProfile: action.bound,
      saveFile: action.bound,
      destroy: action.bound,
      loadTransactions: action.bound,
      changePassword: action.bound,
    });

    reaction(
      () => this.saveProfilePromise?.fulfilled,
      (value) => {
        value && this.loadProfile();
      },
    );
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

  loadStations() {
    this.stationsPromise = fromPromise(
      this.httpService.get<Page<StationType>>(`${API.STATION}/available?page=0&size=10&sort=id,desc&sort=name,asc`),
    );
  }

  loadConnectors(id: number) {
    this.connectorsPromise = fromPromise(
      this.httpService.get<ConnectorType[]>(`${API.CONNECTOR}/available?chargeStationId=${id}`),
    );
  }

  loadProfile() {
    this.profilePromise = fromPromise(this.httpService.get(`${API.USER}/profile`));
  }

  loadCard() {
    this.cardPromise = fromPromise(this.httpService.get(`${API.USER}/payment-card`));
  }

  tieCard(path: string) {
    this.tieCardPromise = fromPromise(this.httpService.post(`${API.TRANSACTION}/tie-card`, { returnUrl: path }));
  }

  loadCurrentTransaction() {
    this.currentTransactionPromise = fromPromise(this.httpService.get(`${API.TRANSACTION}/current`));
  }

  payTransaction(connectorId: string, amount: number | string, initPrice: number | string, returnUrl: string) {
    this.payTransactionPromise = fromPromise(
      this.httpService.post(`${API.TRANSACTION}/pay`, {
        connectorId,
        amount,
        initPrice,
        returnUrl,
      }),
    );
  }

  clearPaid() {
    this.tieCardPromise = undefined;
    this.payTransactionPromise = undefined;
  }

  stopTransaction() {
    this.currentTransactionPromise = fromPromise(this.httpService.post(`/api/transaction/stop`, {}));
  }

  saveProfile(values?: ProfileType) {
    this.saveProfilePromise = fromPromise(this.httpService.put(`${API.USER}/profile`, values));
  }

  loadTransactions() {
    this.transactionsPromise = fromPromise(this.httpService.get(`${API.TRANSACTION}/by-user`));
  }

  changePassword(entity: Record<string, string>) {
    this.changePasswordPromise = fromPromise(this.httpService.put(`${API.USER}/profile/password`, entity));
  }

  saveFile(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    this.saveFilePromise = fromPromise(this.httpService.post(`${API.IMAGE}`, formData, 'none'));
  }

  setToken(token: string) {
    this.httpService.setToken(token);
  }

  destroy() {
    this.stationsPromise = undefined;
    this.connectorsPromise = undefined;
    this.currentTransactionPromise = undefined;
    this.profilePromise = undefined;
    this.keycloak = undefined;
    this.saveProfilePromise = undefined;
    this.saveFilePromise = undefined;
  }
}

export const store = new Store();
