import { action, makeObservable, observable } from 'mobx';
import { API } from 'web/constant';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { ProfileType } from 'web/types';

class Store {

  saveProfilePromise?: PromiseObserver<void> = undefined;
  constructor() {
    makeObservable(this,{
      saveProfilePromise:observable,
      saveProfile:action.bound,
      clear:action.bound
    })
  }

  saveProfile(values?: ProfileType) {
    this.saveProfilePromise = fromPromise(httpService.put(`${API.USER}/profile`, values));
  }

  clear(){
    this.saveProfilePromise = undefined;
  }
}

export const store = new Store();