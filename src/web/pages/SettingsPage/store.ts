import { action, makeObservable, observable } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { SimpleStore } from 'web/helpers/SimpleStore';
import { ProfileType } from 'web/types';

class Store extends SimpleStore {
  saveProfilePromiseObserver?: PromiseObserver<void> = undefined;

  constructor() {
    super();
    makeObservable(this, {
      saveProfilePromiseObserver: observable,
      saveProfile: action.bound,
      clear: action.bound,
    });
  }

  saveProfile(values?: ProfileType) {
    this.saveProfilePromiseObserver = fromPromise(this.httpService.put(`${API.USER}/profile`, values));
  }

  clear() {
    this.saveProfilePromiseObserver = undefined;
  }
}

export const store = new Store();
