import { action, makeObservable, observable, reaction } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { Page, TransactionType } from 'web/types';

class Store {
  transactionsPromise?: PromiseObserver<Page<TransactionType>> = undefined;
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor() {
    makeObservable(this, {
      transactionsPromise: observable,
      sortOrder: observable,
      loadTransactions: action.bound,
      changeSortOrder: action.bound,
      clear: action.bound,
    });

    reaction(() => this.sortOrder, this.loadTransactions);
  }

  loadTransactions() {
    this.transactionsPromise = fromPromise(
      httpService.get(`${API.TRANSACTION}/by-user?&sort=created,${this.sortOrder}`),
    );
  }

  changeSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  clear() {
    this.transactionsPromise = undefined;
    this.sortOrder = 'asc';
  }
}

export const store = new Store();
