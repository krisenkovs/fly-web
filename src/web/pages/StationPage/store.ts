import { action, computed, makeObservable, observable } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { PAYMENT_TYPE, POWER_TYPE } from 'web/pages/StationPage/Connector/Payment/types';
import { STEPS_CONNECTOR } from 'web/pages/StationPage/types';
import { httpService } from 'web/services/HTTPService';
import { ConnectorType, Page, PaidReturnType, StationType } from 'web/types';

class Store {
  step: STEPS_CONNECTOR = STEPS_CONNECTOR.PAYMENT;
  sum = 0;
  power = 0;
  payFromAccount = false;

  powerType: POWER_TYPE = POWER_TYPE.FULL;
  paymentType: PAYMENT_TYPE = PAYMENT_TYPE.ACCOUNT;

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
      powerType: observable,
      paymentType: observable,
      payFromAccount: observable,
      selectedConnectorId: observable,
      tieCardPromise: observable,
      stationPromise: observable,
      connectorsPromise: observable,
      payTransactionPromise: observable,
      setSelectedConnector: action.bound,
      selectedConnector: computed,
      load: action.bound,
      loadConnectors: action.bound,
      payTransaction: action.bound,
      setStep: action.bound,
      setSum: action.bound,
      setPower: action.bound,
      setPaymentType: action.bound,
      setPowerType: action.bound,
      tieCard: action.bound,
      clearSelectedConnector: action.bound,
      clear: action.bound,
    });
  }

  load(id: string) {
    this.stationPromise = fromPromise(httpService.get<Page<StationType>>(`${API.STATION}/${id}`));
  }

  loadConnectors(id: number) {
    this.connectorsPromise = fromPromise(
      httpService.get<ConnectorType[]>(`${API.CONNECTOR}/available?chargeStationId=${id}`),
      this.connectorsPromise?.value,
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
      this.power = Math.round((value / this.stationPromise?.value?.rate) * 10) / 10;
    }
  }

  setPower(value: number) {
    this.power = value;
    if (this.stationPromise?.value?.rate) {
      this.sum = Math.round(value * this.stationPromise?.value?.rate * 100) / 100;
    }
  }

  setPaymentType(value: PAYMENT_TYPE) {
    this.paymentType = value;
    this.payFromAccount = value === PAYMENT_TYPE.ACCOUNT;
  }

  setPowerType(value: POWER_TYPE) {
    this.powerType = value;
  }

  payTransaction(returnUrl?: string) {
    this.payTransactionPromise = fromPromise(
      httpService.post(`${API.TRANSACTION}/pay`, {
        connectorId: this.selectedConnectorId,
        amount: this.power,
        initPrice: this.sum,
        returnUrl,
        payFromAccount: this.payFromAccount,
        gradualWithdraw: this.payFromAccount,
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
    this.paymentType = PAYMENT_TYPE.ACCOUNT;
    this.powerType = POWER_TYPE.FULL;
  }
}

export const store = new Store();
