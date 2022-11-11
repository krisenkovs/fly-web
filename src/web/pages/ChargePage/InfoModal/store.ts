import { ModalStore } from 'web/helpers/ModalStore';
import { StationType, TransactionType } from 'web/types';

export const store = new ModalStore<{ transaction?: TransactionType; station?: StationType }>();
