import { action, makeObservable, observable, reaction } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { TransactionType } from 'web/types';

class Store {
  currentTransactionPromise?: PromiseObserver<TransactionType> = undefined;
  stopTransactionPromise?: PromiseObserver<TransactionType> = undefined;
  currentTransaction?: TransactionType = undefined;

  constructor() {
    makeObservable(this, {
      currentTransactionPromise: observable,
      currentTransaction: observable,
      stopTransactionPromise: observable,
      loadCurrentTransaction: action.bound,
      stopTransaction: action.bound,
      setCurrentTransaction: action.bound,
      clear: action.bound,
    });
    reaction(
      () => this.stopTransactionPromise?.fulfilled,
      (value) => {
        if (value) {
          this.currentTransactionPromise = this.stopTransactionPromise;
          this.currentTransaction = this.stopTransactionPromise?.value;
        }
      },
    );
    reaction(
      () => this.currentTransactionPromise?.fulfilled,
      (value) => {
        if (value) {
          this.currentTransaction = this.currentTransactionPromise?.value;
        }
      },
    );
  }

  setCurrentTransaction(value: TransactionType) {
    this.currentTransaction = value;
  }

  loadCurrentTransaction() {
    this.currentTransactionPromise = fromPromise(
      httpService.get(`${API.TRANSACTION}/current`),
      this.currentTransactionPromise?.value,
    );
  }

  stopTransaction() {
    this.currentTransactionPromise = fromPromise(httpService.post(`/api/transaction/stop`, {}));
  }

  clear() {
    this.currentTransactionPromise = undefined;
    this.stopTransactionPromise = undefined;
    this.currentTransaction = undefined;
  }
}

export const store = new Store();
