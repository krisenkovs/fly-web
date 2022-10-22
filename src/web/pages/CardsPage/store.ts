import { action, makeObservable, observable } from 'mobx';
import { httpService } from 'web/services/HTTPService';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { CardType, PaidReturnType } from 'web/types';

class Store {
  cardPromise?: PromiseObserver<CardType> = undefined;
  tieCardPromise?: PromiseObserver<PaidReturnType> = undefined;

  constructor() {
    makeObservable(this, {
      cardPromise: observable,
      tieCardPromise: observable,
      loadCard: action.bound,
      tieCard: action.bound,
      clear: action.bound,
    });
  }

  loadCard() {
    this.cardPromise = fromPromise(httpService.get(`${API.USER}/payment-card`));
  }

  tieCard(path: string) {
    this.tieCardPromise = fromPromise(httpService.post(`${API.TRANSACTION}/tie-card`, { returnUrl: path }));
  }

  clear() {
    this.cardPromise = undefined;
    this.tieCardPromise = undefined;
  }
}

export const store = new Store();
