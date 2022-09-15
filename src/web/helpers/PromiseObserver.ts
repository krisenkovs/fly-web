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
      onReject: action.bound,
    });

    promise.then((response: T) => this.onResolve(response)).catch(() => this.onReject());
  }

  onResolve(response: T) {
    this.state = PROMISE_TYPE.FULFILLED;
    this.value = response;
  }

  onReject() {
    this.state = PROMISE_TYPE.ERROR;
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
