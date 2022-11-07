import { action, makeObservable, observable } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { PaidReturnType } from 'web/types';

class Store {
  upAccountPromise?: PromiseObserver<PaidReturnType> = undefined;

  constructor() {
    makeObservable(this, {
      upAccountPromise: observable,
      upAccount: action.bound,
      destroy: action.bound,
    });
  }

  upAccount(returnUrl?: string) {
    this.upAccountPromise = fromPromise(
      httpService.post(`${API.TRANSACTION}/pay`, {
        initPrice: 10,
        returnUrl,
        topUp: true,
      }),
    );
  }

  destroy() {
    this.upAccountPromise = undefined;
  }
}

export const store = new Store();
