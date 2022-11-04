import { action, makeObservable, observable } from 'mobx';
import { API } from 'web/constant';
import { ModalStore } from 'web/helpers/ModalStore';
import { fromPromise, PromiseObserver } from 'web/helpers/PromiseObserver';
import { httpService } from 'web/services/HTTPService';
import { ProfileType } from 'web/types';

class Store extends ModalStore<ProfileType> {
  saveFilePromise?: PromiseObserver<string> = undefined;

  constructor() {
    super();
    makeObservable(this, {
      saveFilePromise: observable,
      saveFile: action.bound,
      changeAvatar: action.bound,
      changePhoto: action.bound,
      clear: action.bound,
    });
  }

  saveFile(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    this.saveFilePromise = fromPromise(httpService.post(`${API.IMAGE}`, formData, 'none'));
  }

  changeAvatar(avatarCode: number) {
    this.data = { ...this.data, avatarCode, usePhotoAsAvatar: false, photoId: undefined };
  }

  changePhoto(photoId?: string) {
    this.data = { ...this.data, photoId, usePhotoAsAvatar: true, avatarCode: undefined };
  }

  clear() {
    this.saveFilePromise = undefined;
  }
}

export const store = new Store();
