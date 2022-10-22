import { action, makeObservable, observable } from 'mobx';
import { httpService } from 'web/services/HTTPService';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';

class Store {
  sendCodePromise?: PromiseObserver<void> = undefined;
  validateCodePromise?: PromiseObserver<void> = undefined;
  value: string[] = ['', '', '', ''];

  constructor() {
    makeObservable(this, {
      sendCodePromise: observable,
      validateCodePromise: observable,
      value: observable,
      setValue: action.bound,
      sendCode: action.bound,
      validateCode: action.bound,
      clear: action.bound,
    });
  }

  setValue(data: string[]) {
    this.value = data;
  }

  sendCode() {
    this.sendCodePromise = fromPromise(httpService.post(`${API.USER}/send-code-to-phone`, {}));
  }

  validateCode(code: string) {
    this.validateCodePromise = fromPromise(httpService.post(`${API.USER}/validate-phone-code`, { code }));
  }

  clear() {
    this.validateCodePromise = undefined;
    this.sendCodePromise = undefined;
    this.value = ['', '', '', ''];
  }
}

export const store = new Store();
