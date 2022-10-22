import { action, computed, makeObservable, observable } from 'mobx';
import { httpService } from 'web/services/HTTPService';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { STEPS_CONNECTOR } from 'web/pages/StationPage/types';
import { CardType, ConnectorType, Page, PaidReturnType, StationType } from 'web/types';

class Store {
  step: STEPS_CONNECTOR = STEPS_CONNECTOR.PAYMENT;
  sum: number = 0;
  power: number = 0;

  stationPromise?: PromiseObserver<StationType> = undefined;
  connectorsPromise?: PromiseObserver<ConnectorType[]> = undefined;
  tieCardPromise?: PromiseObserver<PaidReturnType> = undefined;
  cardPromise?: PromiseObserver<CardType> = undefined;
  payTransactionPromise?: PromiseObserver<PaidReturnType> = undefined;

  selectedConnectorId?: string = undefined;

  constructor() {
    makeObservable(this, {
      step: observable,
      sum: observable,
      power: observable,
      selectedConnectorId: observable,
      tieCardPromise: observable,
      cardPromise: observable,
      stationPromise: observable,
      connectorsPromise: observable,
      payTransactionPromise: observable,
      setSelectedConnector: action.bound,
      selectedConnector: computed,
      load: action.bound,
      payTransaction: action.bound,
      setStep: action.bound,
      setSum: action.bound,
      setPower: action.bound,
      tieCard: action.bound,
      clearSelectedConnector: action.bound,
      clear: action.bound,
    });
  }

  load(id: string) {
    this.stationPromise = fromPromise(httpService.get<Page<StationType>>(`${API.STATION}/${id}`));
    this.connectorsPromise = fromPromise(
      httpService.get<ConnectorType[]>(`${API.CONNECTOR}/available?chargeStationId=${id}`),
    );
    this.cardPromise = fromPromise(httpService.get(`${API.USER}/payment-card`));
  }

  tieCard(path: string) {
    this.tieCardPromise = fromPromise(httpService.post(`${API.TRANSACTION}/tie-card`, { returnUrl: path }));
  }

  setSelectedConnector(id: string) {
    this.selectedConnectorId = id;
  }

  setStep(step: STEPS_CONNECTOR) {
    this.step = step;
  }

  setSum(value: number) {
    this.sum = value;
  }

  setPower(value: number) {
    this.power = value;
  }

  payTransaction(connectorId?: number, amount?: number | string, initPrice?: number | string, returnUrl?: string) {
    this.payTransactionPromise = fromPromise(
      httpService.post(`${API.TRANSACTION}/pay`, {
        connectorId,
        amount,
        initPrice,
        returnUrl,
      }),
    );
  }

  get selectedConnector() {
    return this.connectorsPromise?.value?.find((item) => item?.id === Number(this.selectedConnectorId));
  }

  clearSelectedConnector() {
    this.sum = 0;
    this.power = 0;
    this.selectedConnectorId = undefined;
    this.payTransactionPromise = undefined;
    this.step = STEPS_CONNECTOR.PAYMENT;
  }

  clear() {
    this.stationPromise = undefined;
    this.connectorsPromise = undefined;
    this.selectedConnectorId = undefined;
    this.tieCardPromise = undefined;
    this.cardPromise = undefined;
    this.payTransactionPromise = undefined;
    this.step = STEPS_CONNECTOR.PAYMENT;
    this.sum = 0;
    this.power = 0;
  }
}

export const store = new Store();
