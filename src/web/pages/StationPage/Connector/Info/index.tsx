import { store } from '../../store';
import { DescriptionField } from './DescriptionField';
import styles from './styles.module.css';
import { Typography } from 'components';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { COLORS } from 'constant';
import { FlyIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { store as mainStore } from 'web/application/store';
import { Header } from 'web/components/Header';
import { notification } from 'web/components/NotificationManager';
import { ERRORS, ROUTES } from 'web/constant';
import { STEPS_CONNECTOR } from 'web/pages/StationPage/types';

export const Info = observer(() => {
  const { push } = useHistory();

  const { selectedConnector, stationPromise, power, sum, payTransactionPromise, setStep, payFromAccount } = store;
  const { cardPromise } = mainStore;

  useEffect(() => {
    if (payTransactionPromise?.fulfilled) {
      if (payTransactionPromise.value?.redirectUrl) {
        window.location.href = payTransactionPromise.value?.redirectUrl;
      } else {
        push(ROUTES.CHARGE);
      }
    }
  }, [payTransactionPromise?.fulfilled]);

  useEffect(() => {
    if (payTransactionPromise?.rejected) {
      if (payTransactionPromise?.error?.message === 'bepaid-error') {
        push(ROUTES.PAY_ERROR);
      } else {
        notification({
          content: (
            <Typography color={COLORS.BLACK} weight={500} size={16} lineHeight={24}>
              {ERRORS[payTransactionPromise?.error?.message || ''] || payTransactionPromise?.error?.message}
            </Typography>
          ),
        });
      }
    }
  }, [payTransactionPromise?.rejected]);

  function handleStart() {
    store.payTransaction(`${window.location.origin}${ROUTES.CHARGE}`);
  }

  function handleBackClick() {
    setStep(STEPS_CONNECTOR.PAYMENT);
  }

  return (
    <Box flex={1}>
      <Header title="Начните зарядку" showBackButton showProfileButton={false} onBackClick={handleBackClick} />
      <Box flex={1} />
      <Box height={100} position="relative" alignItems="center" justifyContent="center">
        <img src="images/waves.png" className={styles.image} alt="" />

        <FlyIcon width={80} height={80} color={COLORS.LIGHT_BLUE} />
      </Box>

      <Box flex={1} />
      <Box paddingLeft={16} paddingRight={16}>
        <DescriptionField label="Адрес" value={stationPromise?.value?.address} />
        <DescriptionField label="№ колонки" value={stationPromise?.value?.id} />
        <DescriptionField label="Тип разъема" value={selectedConnector?.type} />
        <DescriptionField label="kWh" value={power} />
        <DescriptionField label="BYN" value={sum?.toFixed(2)} />
        <DescriptionField
          label="Способ оплаты"
          value={payFromAccount ? 'Баланс' : `${cardPromise?.value?.brand} •••• ${cardPromise?.value?.last4}`}
        />
      </Box>
      <Box flex={1} />
      <Box marginBottom={48} marginLeft={16} marginRight={16}>
        <Button
          label="Оплатить и зарядить"
          disabled={payTransactionPromise?.pending || payTransactionPromise?.fulfilled}
          onClick={handleStart}
        />
      </Box>
    </Box>
  );
});
