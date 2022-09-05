import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { action, makeObservable, observable, reaction } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { SimpleStore } from 'web/helpers/SimpleStore';
import { ConnectorType, Page, ProfileType, StationType, TransactionType } from 'web/types';

class Store extends SimpleStore {
  stationsPromise?: PromiseObserver<Page<StationType>> = undefined;
  connectorsPromise?: PromiseObserver<ConnectorType[]> = undefined;
  currentTransactionPromise?: PromiseObserver<TransactionType> = undefined;
  saveProfilePromise?: PromiseObserver<void> = undefined;
  transactionPromise?: PromiseObserver<TransactionType> = undefined;
  profilePromise?: PromiseObserver<ProfileType> = undefined;
  keycloak?: KeycloakInstance = undefined;
  saveFilePromise?: PromiseObserver<string> = undefined;

  constructor() {
    super();
    makeObservable(this, {
      keycloak: observable,
      stationsPromise: observable,
      connectorsPromise: observable,
      currentTransactionPromise: observable,
      transactionPromise: observable,
      profilePromise: observable,
      saveProfilePromise: observable,
      saveFilePromise: observable,
      init: action.bound,
      loadStations: action.bound,
      loadConnectors: action.bound,
      loadCurrentTransaction: action.bound,
      loadProfile: action.bound,
      startTransaction: action.bound,
      stopTransaction: action.bound,
      saveProfile: action.bound,
      clearTransaction: action.bound,
      saveFile: action.bound,
      destroy: action.bound,
    });

    reaction(
      () => this.transactionPromise?.fulfilled,
      (value) => {
        value && this.loadCurrentTransaction();
      },
    );

    reaction(
      () => this.saveProfilePromise?.fulfilled,
      (value) => {
        value && this.loadProfile();
      },
    );
  }

  init() {
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

  loadCurrentTransaction() {
    this.currentTransactionPromise = fromPromise(this.httpService.get(`${API.TRANSACTION}/current`));
  }

  startTransaction(connectorId: number, price: number, amount: number) {
    this.transactionPromise = fromPromise(
      this.httpService.post(`/api/transaction/start`, {
        connectorId,
        price,
        amount,
      }),
    );
  }

  stopTransaction() {
    this.transactionPromise = fromPromise(this.httpService.post(`/api/transaction/stop`, {}));
  }

  saveProfile(values?: ProfileType) {
    this.saveProfilePromise = fromPromise(this.httpService.put(`${API.USER}/profile`, values));
  }

  clearTransaction() {
    this.transactionPromise = undefined;
  }

  saveFile(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    this.saveFilePromise = fromPromise(
      this.httpService.post(`${API.IMAGE}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    );
  }

  destroy() {
    this.stationsPromise = undefined;
    this.connectorsPromise = undefined;
    this.currentTransactionPromise = undefined;
    this.profilePromise = undefined;
    this.transactionPromise = undefined;
    this.keycloak = undefined;
    this.saveProfilePromise = undefined;
    this.saveFilePromise = undefined;
  }
}

export const store = new Store();
