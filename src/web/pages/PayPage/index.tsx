import { DescriptionField } from './DescriptionField';
import styles from './styles.module.css';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { COLORS } from 'constant';
import { FlyIcon } from 'icons';
import { observer } from 'mobx-react';
import React, { useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { store } from 'web/application/store';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';
import { useLocationParams } from 'web/helpers/useLocationParams';

export const PayPage = observer(function PayPage() {
  const { push } = useHistory();
  const params = useParams<{ stationId: string; connectorId: string; cardId: string }>();
  const locationParams = useLocationParams();

  const sum = locationParams.get('sum') || 0;
  const power = locationParams.get('power') || 0;

  const station = useMemo(() => {
    return store.stationsPromise?.value?.content?.find((item) => item?.id === +params?.stationId);
  }, [params, store.stationsPromise?.value]);

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
    store.payTransaction(params.connectorId, power, sum, `${window.location.origin}/${ROUTES.CHARGE}`);
  }

  return (
    <Box flex={1}>
      <Header title="Начните зарядку" showBackButton showProfileButton={false} />
      <Box flex={1} />
      <Box height={100} position="relative" alignItems="center" justifyContent="center">
        <img src="images/waves.png" className={styles.image} alt="" />

        <FlyIcon width={80} height={80} color={COLORS.LIGHT_BLUE} />
      </Box>

      <Box flex={1} />
      <Box paddingLeft={16} paddingRight={16}>
        <DescriptionField label="Адрес" value={station?.address} />
        <DescriptionField label="№ колонки" value={station?.id} />
        <DescriptionField label="Тип разъема" value="CCS" />
        <DescriptionField label="Киловаты" value={power} />
        <DescriptionField label="BYN" value={sum} />
        <DescriptionField
          label="Способ оплаты"
          value={`${store.cardPromise?.value?.brand} •••• ${store.cardPromise?.value?.last4}`}
        />
      </Box>
      <Box flex={1} />
      <Box marginBottom={48} marginLeft={16} marginRight={16}>
        <Button label="Оплатить и зарядить" disabled={store.payTransactionPromise?.pending} onClick={handleStart} />
      </Box>
    </Box>
  );
});
