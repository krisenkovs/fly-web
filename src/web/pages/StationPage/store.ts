import { action, computed, makeObservable, observable } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { STEPS_CONNECTOR } from 'web/pages/StationPage/types';
import { httpService } from 'web/services/HTTPService';
import { ConnectorType, Page, PaidReturnType, StationType } from 'web/types';

class Store {
  step: STEPS_CONNECTOR = STEPS_CONNECTOR.PAYMENT;
  sum = 0;
  power = 0;
  payFromAccount = false;

  stationPromise?: PromiseObserver<StationType> = undefined;
  connectorsPromise?: PromiseObserver<ConnectorType[]> = undefined;
  tieCardPromise?: PromiseObserver<PaidReturnType> = undefined;
  payTransactionPromise?: PromiseObserver<PaidReturnType> = undefined;

  selectedConnectorId?: string = undefined;

  constructor() {
    makeObservable(this, {
      step: observable,
      sum: observable,
      power: observable,
      payFromAccount: observable,
      selectedConnectorId: observable,
      tieCardPromise: observable,
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
      setPayFromAccount: action.bound,
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
    if (this.stationPromise?.value?.rate) {
      this.power = Math.trunc(value / this.stationPromise?.value?.rate);
    }
  }

  setPower(value: number) {
    this.power = value;
    if (this.stationPromise?.value?.rate) {
      this.sum = Math.trunc(value * this.stationPromise?.value?.rate);
    }
  }

  setPayFromAccount(value: boolean) {
    this.payFromAccount = value;
  }

  payTransaction(returnUrl?: string) {
    this.payTransactionPromise = fromPromise(
      httpService.post(`${API.TRANSACTION}/pay`, {
        connectorId: this.selectedConnectorId,
        amount: this.power,
        initPrice: this.sum,
        returnUrl,
        payFromAccount: this.payFromAccount,
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
    this.payTransactionPromise = undefined;
    this.step = STEPS_CONNECTOR.PAYMENT;
    this.sum = 0;
    this.power = 0;
    this.payFromAccount = false;
  }
}

export const store = new Store();
