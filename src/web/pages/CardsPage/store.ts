import { action, makeObservable, observable } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { PaidReturnType } from 'web/types';

class Store {
  tieCardPromise?: PromiseObserver<PaidReturnType> = undefined;
  constructor() {
    makeObservable(this, {
      tieCardPromise: observable,
      tieCard: action.bound,
      destroy: action.bound,
    });
  }

  tieCard(path: string) {
    this.tieCardPromise = fromPromise(httpService.post(`${API.TRANSACTION}/tie-card`, { returnUrl: path }));
  }

  destroy() {
    this.tieCardPromise = undefined;
  }
}

export const store = new Store();
