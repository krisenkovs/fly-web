import { action, makeObservable } from 'mobx';
import { ModalStore } from 'web/helpers/ModalStore';
import { CONNECTOR } from 'web/pages/CarPage/ConnectorModal/types';

class Store extends ModalStore<CONNECTOR> {
  constructor() {
    super();
    makeObservable(this, {
      setSelected: action.bound,
    });
  }

  setSelected(value: CONNECTOR) {
    this.data = value;
  }
}

export const store = new Store();
