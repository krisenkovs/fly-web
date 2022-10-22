import { action, makeObservable, observable } from 'mobx';
import { httpService } from 'web/services/HTTPService';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { Page, StationType, TransactionType } from 'web/types';

class Store {
  stationsPromise?: PromiseObserver<Page<StationType>> = undefined;
  currentTransactionPromise?: PromiseObserver<TransactionType> = undefined;
  constructor() {
    makeObservable(this, {
      stationsPromise: observable,
      currentTransactionPromise: observable,
      loadStations: action.bound,
      loadCurrentTransaction: action.bound,
      clear: action.bound,
    });
  }

  loadStations() {
    this.stationsPromise = fromPromise(
      httpService.get<Page<StationType>>(`${API.STATION}/available?page=0&size=10&sort=id,desc&sort=name,asc`),
    );
  }

  loadCurrentTransaction() {
    this.currentTransactionPromise = fromPromise(
      httpService.get(`${API.TRANSACTION}/current`),
      this.currentTransactionPromise?.value,
    );
  }

  clear() {
    this.stationsPromise = undefined;
    this.currentTransactionPromise = undefined;
  }
}

export const store = new Store();
