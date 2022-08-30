import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { SimpleStore } from 'web/helpers/SimpleStore';
import { ConnectorType, Page, ProfileType, StationType, TransactionType } from 'web/types';

class Store extends SimpleStore {
  stationsPromise?: PromiseObserver<Page<StationType>> = undefined;
  connectorsPromise?: PromiseObserver<ConnectorType[]> = undefined;
  currentTransactionPromise?: PromiseObserver<TransactionType> = undefined;
  transactionPromise?: PromiseObserver<TransactionType> = undefined;
  profilePromise?: PromiseObserver<ProfileType> = undefined;
  keycloak?: KeycloakInstance = undefined;

  selectedStation?: number = undefined;
  selectedConnector?: number = undefined;
  selectedSum: number = 0;
  selectedPower: number = 0;

  constructor() {
    super();
    makeObservable(this, {
      keycloak: observable,
      stationsPromise: observable,
      connectorsPromise: observable,
      currentTransactionPromise: observable,
      transactionPromise: observable,
      profilePromise: observable,
      selectedStation: observable,
      selectedConnector: observable,
      selectedSum: observable,
      selectedPower: observable,
      currentStation: computed,
      init: action.bound,
      loadStations: action.bound,
      loadConnectors: action.bound,
      loadCurrentTransaction: action.bound,
      loadProfile: action.bound,
      setSelectedStation: action.bound,
      setSelectedConnector: action.bound,
      setSelectedSum: action.bound,
      setSelectedPower: action.bound,
      startTransaction: action.bound,
      stopTransaction: action.bound,
      destroy: action.bound,
    });

    reaction(
      () => this.selectedStation,
      (value) => {
        this.selectedConnector = undefined;
        this.selectedSum = 0;
        this.selectedPower = 0;
        value && this.loadConnectors(value);
      },
    );

    reaction(
      () => this.selectedConnector,
      (value) => {
        this.selectedSum = 0;
        this.selectedPower = 0;
      },
    );

    reaction(
      () => this.transactionPromise?.fulfilled,
      (value) => {
        value && this.loadCurrentTransaction();
        //this.transactionPromise = undefined;
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

  startTransaction() {
    this.transactionPromise = fromPromise(
      this.httpService.post(`/api/transaction/start`, {
        connectorId: this.selectedConnector,
        price: this.currentStation?.rate,
        amount: this.selectedSum,
      }),
    );
  }

  stopTransaction() {
    this.transactionPromise = fromPromise(this.httpService.post(`/api/transaction/stop`, {}));
  }

  get currentStation() {
    return this.stationsPromise?.value?.content?.find((item) => item?.id === this.selectedStation);
  }

  setSelectedStation(id: number) {
    this.selectedStation = id;
  }

  setSelectedConnector(id: number) {
    this.selectedConnector = id;
  }

  setSelectedSum(value: number) {
    this.selectedSum = value;
  }

  setSelectedPower(value: number) {
    this.selectedPower = value;
  }

  destroy() {
    this.stationsPromise = undefined;
    this.connectorsPromise = undefined;
    this.currentTransactionPromise = undefined;
    this.profilePromise = undefined;
    this.selectedStation = undefined;
    this.selectedConnector = undefined;
    this.transactionPromise = undefined;
    this.selectedSum = 0;
    this.selectedPower = 0;
    this.keycloak = undefined;
  }
}

export const store = new Store();
