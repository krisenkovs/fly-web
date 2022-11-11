import { Button } from 'components';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'web/constant';
import { TRANSACTION_STATUS } from 'web/types';

type Props = {
  status: TRANSACTION_STATUS;
  loading: boolean;
  onStart: () => void;
  onStop: () => void;
};

export function ActionButton({ status, loading, onStart, onStop }: Props) {
  const { replace } = useHistory();

  function handleFinishClick() {
    replace(ROUTES.MAIN);
  }
  switch (status) {
    case TRANSACTION_STATUS.ACTIVE:
      return <Button label="Остановить" onClick={onStop} loading={loading} />;
    case TRANSACTION_STATUS.CLOSED:
      return <Button label="Круто" onClick={handleFinishClick} loading={loading} />;
    case TRANSACTION_STATUS.STOPPED:
      return <Button label="Возобновить" onClick={onStart} loading={loading} />;
    case TRANSACTION_STATUS.ERROR:
      return <Button label="Возобновить" onClick={onStart} loading={loading} />;
    default:
      return null;
  }
}
