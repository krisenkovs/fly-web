import { action, makeObservable, observable } from 'mobx';

export class ModalStore<T = any> {
  data?: T = undefined;
  visible: boolean = false;

  constructor() {
    makeObservable(this, {
      data: observable,
      visible: observable,
      show: action.bound,
      hide: action.bound,
    });
  }

  show(data?: T) {
    this.visible = true;
    this.data = data;
  }

  hide() {
    this.visible = false;
    this.data = undefined;
  }
}
