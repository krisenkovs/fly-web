import { action, makeObservable, observable } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { PaidReturnType } from 'web/types';

class Store {
  upAccountPromise?: PromiseObserver<PaidReturnType> = undefined;
  sum?: string = '0';

  constructor() {
    makeObservable(this, {
      upAccountPromise: observable,
      sum: observable,
      upAccount: action.bound,
      setSum: action.bound,
      destroy: action.bound,
    });
  }

  setSum(value?: string) {
    this.sum = value;
  }

  upAccount(returnUrl?: string) {
    this.upAccountPromise = fromPromise(
      httpService.post(`${API.TRANSACTION}/pay`, {
        initPrice: this.sum,
        returnUrl,
        topUp: true,
      }),
    );
  }

  destroy() {
    this.upAccountPromise = undefined;
    this.sum = '0';
  }
}

export const store = new Store();
