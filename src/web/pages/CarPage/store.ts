import { action, makeObservable, observable } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { CarType } from 'web/types';

class Store {
  saveCarPromise?: PromiseObserver<CarType> = undefined;
  constructor() {
    makeObservable(this, {
      saveCarPromise: observable,
      saveCarInfo: action.bound,
      destroy: action.bound,
    });
  }

  saveCarInfo(data: CarType) {
    this.saveCarPromise = fromPromise(data.id ? httpService.put(API.CAR, data) : httpService.post(API.CAR, data));
  }

  destroy() {
    this.saveCarPromise = undefined;
  }
}

export const store = new Store();
