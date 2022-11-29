import { Typography } from 'components';
import { COLORS } from 'constant';
import React from 'react';
import { TRANSACTION_STATUS } from 'web/types';

type Props = {
  status?: TRANSACTION_STATUS;
};

export function Title({ status }: Props) {
  switch (status) {
    case TRANSACTION_STATUS.ACTIVE:
      return (
        <Typography weight={800} size={24} lineHeight={30} color={COLORS.BLACK} textAlign="center">
          Идёт зарядка батареи
        </Typography>
      );
    case TRANSACTION_STATUS.STOPPED:
      return (
        <Typography weight={800} size={24} lineHeight={30} color={COLORS.BLACK} textAlign="center">
          Зарядка остановлена
        </Typography>
      );
    case TRANSACTION_STATUS.CLOSING:
      return (
        <Typography weight={800} size={24} lineHeight={30} color={COLORS.BLACK} textAlign="center">
          Завершение зарядки
        </Typography>
      );
    case TRANSACTION_STATUS.CLOSED:
      return (
        <Typography weight={800} size={24} lineHeight={30} color={COLORS.BLACK} textAlign="center">
          Зарядка завершена
        </Typography>
      );
    case TRANSACTION_STATUS.ERROR:
      return (
        <Typography weight={800} size={24} lineHeight={30} color={COLORS.RED} textAlign="center">
          Ошибка зарядки
        </Typography>
      );
    case TRANSACTION_STATUS.CREATED:
      return (
        <Typography weight={800} size={24} lineHeight={30} color={COLORS.RED} textAlign="center">
          Зарядка еще не оплачена
        </Typography>
      );
    default:
      return null;
  }
}
