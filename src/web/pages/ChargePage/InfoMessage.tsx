import { store } from './store';
import { Typography } from 'components';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { diffDate, formatTime } from 'web/helpers/formatter';
import { TRANSACTION_STATUS } from 'web/types';

type Props = {
  status: TRANSACTION_STATUS;
  startDate?: string;
  endDate: string;
};

export const InfoMessage = observer(({ status, startDate, endDate }: Props) => {
  switch (status) {
    case TRANSACTION_STATUS.ACTIVE:
      return (
        <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
          Выполняется зарядка
        </Typography>
      );
    case TRANSACTION_STATUS.STOPPED:
      return (
        <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
          {`Зарядка остановлена в ${formatTime(endDate)} с момента зарядки прошло ${diffDate(startDate, endDate)}`}
        </Typography>
      );
    case TRANSACTION_STATUS.CLOSING:
      return (
        <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
          Завержение процесса зарядки
        </Typography>
      );
    case TRANSACTION_STATUS.CLOSED:
      return (
        <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
          Зарядка успешно завершена
        </Typography>
      );
    case TRANSACTION_STATUS.ERROR:
      return (
        <Typography weight={400} size={16} lineHeight={24} color={COLORS.RED} textAlign="center">
          {store.currentTransactionPromise?.value?.errorMessage}
        </Typography>
      );
    case TRANSACTION_STATUS.CREATED:
      return (
        <Typography weight={400} size={16} lineHeight={24} color={COLORS.RED} textAlign="center">
          Зарядка не выполняется
        </Typography>
      );
    default:
      return null;
  }
});
