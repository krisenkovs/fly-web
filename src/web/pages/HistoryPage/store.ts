import { action, makeObservable, observable, reaction } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { Page, TransactionType } from 'web/types';

class Store {
  transactionsPromise?: PromiseObserver<Page<TransactionType>> = undefined;
  data: TransactionType[] = [];
  totalElements = 0;
  size = 15;
  page = 0;
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor() {
    makeObservable(this, {
      transactionsPromise: observable,
      page: observable,
      size: observable,
      totalElements: observable,
      data: observable,
      sortOrder: observable,
      loadTransactions: action.bound,
      changeSortOrder: action.bound,
      loadNextPage: action.bound,
      clear: action.bound,
    });

    reaction(
      () => this.sortOrder,
      () => {
        this.data = [];
        this.page = 0;
        this.loadTransactions();
      },
    );

    reaction(
      () => this.transactionsPromise?.fulfilled,
      () => {
        this.totalElements = this.transactionsPromise?.value?.totalElements || 0;
        this.data = [...this.data, ...(this.transactionsPromise?.value?.content || [])];
      },
    );
  }

  loadTransactions() {
    this.transactionsPromise = fromPromise(
      httpService.get(`${API.TRANSACTION}/by-user?sort=id,${this.sortOrder}&page=${this.page}&size=${this.size}`),
    );
  }

  loadNextPage() {
    if (!this.transactionsPromise?.pending && this.data?.length < this.totalElements) {
      if (!this.transactionsPromise?.error) {
        this.page++;
      }
      this.loadTransactions();
    }
  }

  changeSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  clear() {
    this.transactionsPromise = undefined;
    this.page = 0;
    this.size = 15;
    this.totalElements = 0;
    this.data = [];
  }
}

export const store = new Store();
