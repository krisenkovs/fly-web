import { action, makeObservable, observable } from 'mobx';
import { container } from 'web/container';

export abstract class ModalStore {
  protected readonly httpService;

  visible = false;

  protected constructor() {
    this.httpService = container.httpService;
    makeObservable(this, { visible: observable, show: action.bound, close: action.bound });
  }

  show() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}