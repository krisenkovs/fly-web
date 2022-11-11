import { action, makeObservable, observable, reaction } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { Page, StationType, TransactionType } from 'web/types';

class Store {
  currentTransactionPromise?: PromiseObserver<TransactionType> = undefined;
  stopTransactionPromise?: PromiseObserver<TransactionType> = undefined;
  stationPromise?: PromiseObserver<StationType> = undefined;

  constructor() {
    makeObservable(this, {
      currentTransactionPromise: observable,
      stopTransactionPromise: observable,
      stationPromise: observable,
      loadCurrentTransaction: action.bound,
      stopTransaction: action.bound,
      loadStation: action.bound,
      clear: action.bound,
    });
    reaction(
      () => this.stationId,
      (value) => value && this.loadStation(value),
    );
    reaction(
      () => this.stopTransactionPromise?.fulfilled,
      (value) => {
        if (value) {
          this.currentTransactionPromise = this.stopTransactionPromise;
        }
      },
    );
  }

  loadCurrentTransaction() {
    this.currentTransactionPromise = fromPromise(
      httpService.get(`${API.TRANSACTION}/current`),
      this.currentTransactionPromise?.value,
    );
  }

  loadStation(id: number) {
    this.stationPromise = fromPromise(httpService.get<Page<StationType>>(`${API.STATION}/${id}`));
  }

  stopTransaction() {
    this.currentTransactionPromise = fromPromise(httpService.post(`/api/transaction/stop`, {}));
  }

  get stationId() {
    return this.currentTransactionPromise?.value?.chargeStationId;
  }

  clear() {
    this.currentTransactionPromise = undefined;
    this.stopTransactionPromise = undefined;
    this.stationPromise = undefined;
  }
}

export const store = new Store();
