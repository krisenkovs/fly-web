import { store } from '../../store';
import { DescriptionField } from './DescriptionField';
import styles from './styles.module.css';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { COLORS } from 'constant';
import { FlyIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { store as mainStore } from 'web/application/store';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';
import { STEPS_CONNECTOR } from 'web/pages/StationPage/types';

export const Info = observer(() => {
  const { push } = useHistory();

  const { selectedConnector, stationPromise, power, sum, payTransactionPromise, setStep, payFromAccount } = store;
  const { cardPromise } = mainStore;

  useEffect(() => {
    if (store.payTransactionPromise?.fulfilled) {
      if (store.payTransactionPromise.value?.redirectUrl) {
        window.location.href = store.payTransactionPromise.value?.redirectUrl;
      }
    }
  }, [store.payTransactionPromise?.fulfilled]);

  useEffect(() => {
    if (store.payTransactionPromise?.error) {
      push(ROUTES.PAY_ERROR);
    }
  }, [store.payTransactionPromise?.error]);

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
        <DescriptionField label="Киловаты" value={power} />
        <DescriptionField label="BYN" value={sum} />
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
