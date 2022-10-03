import { Typography } from 'components';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { store } from 'web/application/store';
import { TRANSACTION_STATUS } from 'web/types';

type Props = {
  status: TRANSACTION_STATUS;
};

export function InfoMessage ({status}:Props) {
  switch (status) {
    case TRANSACTION_STATUS.ACTIVE:
      return <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
        Выполняется зарядка
      </Typography>;
    case TRANSACTION_STATUS.STOPPED:
      return <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
        Зарядка остановлена
      </Typography>;
    case TRANSACTION_STATUS.CLOSED:
      return <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
        Зарядка успешно завершена
      </Typography>;
    case TRANSACTION_STATUS.ERROR:
      return <Typography weight={400} size={16} lineHeight={24} color={COLORS.RED} textAlign="center">
        {store.currentTransactionPromise?.value?.errorMessage}
      </Typography>;
    case TRANSACTION_STATUS.CREATED:
      return <Typography weight={400} size={16} lineHeight={24} color={COLORS.RED} textAlign="center">
        Зарядка не выполняется
      </Typography>;
    default:
      return null;
  }
};
