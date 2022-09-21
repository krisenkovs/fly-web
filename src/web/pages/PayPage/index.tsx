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

  const station = useMemo(() => {
    return store.stationsPromise?.value?.content?.find((item) => item?.id === +params?.stationId);
  }, [params, store.stationsPromise?.value]);

  useEffect(() => {
    return () => store.clearTransaction();
  }, []);

  useEffect(() => {
    if (store.transactionPromise?.fulfilled) {
      push(ROUTES.CHARGE);
    }
  }, [store.transactionPromise?.fulfilled]);

  useEffect(() => {
    if (store.transactionPromise?.error) {
      push(ROUTES.PAY_ERROR);
    }
  }, [store.transactionPromise?.error]);

  function handleStart() {
    const sum = locationParams.get('sum') || 0;
    const power = locationParams.get('power') || 0;
    store.startTransaction(+params?.connectorId, +sum, +power);
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
        <DescriptionField label="Киловаты" value={locationParams.get('power') || ''} />
        <DescriptionField label="BYN" value={locationParams.get('sum') || ''} />
        <DescriptionField label="Способ оплаты" value="Visa •••• 4320 " />
      </Box>
      <Box flex={1} />
      <Box marginBottom={48} marginLeft={16} marginRight={16}>
        <Button label="Оплатить и зарядить" disabled={store.transactionPromise?.pending} onClick={handleStart} />
      </Box>
    </Box>
  );
});
