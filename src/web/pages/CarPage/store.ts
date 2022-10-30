import { action, makeObservable, observable } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { CarType } from 'web/types';

class Store {
  carPromise?: PromiseObserver<CarType> = undefined;
  savePromise?: PromiseObserver<CarType> = undefined;

  constructor() {
    makeObservable(this, {
      carPromise: observable,
      savePromise: observable,
      loadCarInfo: action.bound,
      saveCarInfo: action.bound,
      destroy: action.bound,
    });
  }

  loadCarInfo() {
    this.carPromise = fromPromise(httpService.get(API.CAR));
  }

  saveCarInfo(data: CarType) {
    this.savePromise = fromPromise(data.id ? httpService.put(API.CAR, data) : httpService.post(API.CAR, data));
  }

  destroy() {
    this.carPromise = undefined;
    this.savePromise = undefined;
  }
}

export const store = new Store();
