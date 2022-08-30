import { AxiosResponse } from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

enum PROMISE_TYPE {
  PENDING,
  FULFILLED,
  ERROR,
}

export class PromiseObserver<T> {
  state: PROMISE_TYPE = PROMISE_TYPE.PENDING;
  value?: T = undefined;

  constructor(promise: Promise<T>) {
    makeObservable(this, {
      state: observable,
      value: observable,
      pending: computed,
      fulfilled: computed,
      error: computed,
      onResolve: action.bound,
    });

    promise
      .then((response: unknown) => this.onResolve(response as AxiosResponse<T>))
      .catch(() =>
        runInAction(() => {
          this.state = PROMISE_TYPE.ERROR;
        }),
      );
  }

  onResolve(response: AxiosResponse<T>) {
    if (response.status === 200) {
      this.state = PROMISE_TYPE.FULFILLED;
      this.value = (response as AxiosResponse<T>)?.data;
    } else {
      this.state = PROMISE_TYPE.ERROR;
      this.value = (response as AxiosResponse<T>)?.data;
    }
  }

  get pending() {
    return this.state === PROMISE_TYPE.PENDING;
  }

  get fulfilled() {
    return this.state === PROMISE_TYPE.FULFILLED;
  }

  get error() {
    return this.state === PROMISE_TYPE.ERROR;
  }
}

export function fromPromise<T>(promise: Promise<T>) {
  return new PromiseObserver(promise);
}
