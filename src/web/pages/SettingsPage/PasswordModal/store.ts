import { action, makeObservable, observable } from 'mobx';
import { API } from 'web/constant';
import { ModalStore } from 'web/helpers/ModalStore';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';

class Store extends ModalStore {
  changePasswordPromise?: PromiseObserver<void> = undefined;

  constructor() {
    super();
    makeObservable(this, {
      changePasswordPromise: observable,
      changePassword: action.bound,
      clear: action.bound,
    });
  }

  changePassword(entity: Record<string, string>) {
    this.changePasswordPromise = fromPromise(httpService.put(`${API.USER}/profile/password`, entity));
  }

  clear() {
    this.hide();
    this.changePasswordPromise = undefined;
  }
}

export const store = new Store();
