import { action, makeObservable, observable, reaction } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { Page, StationType, TransactionType } from 'web/types';

class Store {
  stationsPromise?: PromiseObserver<Page<StationType>> = undefined;
  currentTransactionPromise?: PromiseObserver<TransactionType> = undefined;
  currentTransaction?: TransactionType = undefined;
  constructor() {
    makeObservable(this, {
      stationsPromise: observable,
      currentTransactionPromise: observable,
      currentTransaction: observable,
      loadStations: action.bound,
      loadCurrentTransaction: action.bound,
      setCurrentTransaction: action.bound,
      clear: action.bound,
    });

    reaction(
      () => this.currentTransactionPromise?.value,
      (value) => {
        this.currentTransaction = value;
      },
    );
  }

  loadStations() {
    this.stationsPromise = fromPromise(
      httpService.get<Page<StationType>>(`${API.STATION}/available?page=0&size=10&sort=id,desc&sort=name,asc`),
      this.stationsPromise?.value,
    );
  }

  loadCurrentTransaction() {
    this.currentTransactionPromise = fromPromise(
      httpService.get(`${API.TRANSACTION}/current`),
      this.currentTransactionPromise?.value,
    );
  }

  setCurrentTransaction(value: TransactionType) {
    this.currentTransaction = value;
  }

  clear() {
    //this.stationsPromise = undefined;
    //this.currentTransactionPromise = undefined;
    //this.currentTransaction = undefined;
  }
}

export const store = new Store();
