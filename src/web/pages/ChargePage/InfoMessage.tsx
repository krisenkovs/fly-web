import { store } from './store';
import { Typography } from 'components';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ERRORS } from 'web/constant';
import { diffDate, formatTime } from 'web/helpers/formatter';
import { STOP_PURPOSE_CODE, TRANSACTION_STATUS } from 'web/types';

type Props = {
  status?: TRANSACTION_STATUS;
  startDate?: string;
  endDate?: string;
  stopReason?: STOP_PURPOSE_CODE;
};

export const InfoMessage = observer(({ status, startDate, endDate, stopReason }: Props) => {
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
          Идет завершение процесса зарядки
        </Typography>
      );
    case TRANSACTION_STATUS.CLOSED:
      switch (stopReason) {
        case STOP_PURPOSE_CODE.RUN_OUT_OF_MONEY_ON_ACCOUNT:
          return (
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
              Закончились средства на балансе
            </Typography>
          );
        case STOP_PURPOSE_CODE.MANUAL_STOP:
          return (
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
              Ручная остановка
            </Typography>
          );
        case STOP_PURPOSE_CODE.UNKNOWN_PURPOSE:
          return (
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
              Неизвестная причина
            </Typography>
          );
        case STOP_PURPOSE_CODE.BATTERY_IS_FULLY_CHARGED:
          return (
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
              Батарея полностью заряжена
            </Typography>
          );
        case STOP_PURPOSE_CODE.CHARGING_COMPLETED_ACCORDING_TO_PRECHECK:
          return (
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
              Зарядка успешно завершена
            </Typography>
          );
        default:
          return (
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
              Зарядка успешно завершена
            </Typography>
          );
      }

    case TRANSACTION_STATUS.ERROR:
      return (
        <Typography weight={400} size={16} lineHeight={24} color={COLORS.RED} textAlign="center">
          {ERRORS[store.currentTransactionPromise?.value?.errorMessage || ''] ||
            store.currentTransactionPromise?.value?.errorMessage}
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
