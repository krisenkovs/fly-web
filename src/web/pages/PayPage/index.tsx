import { Fly } from "icons";
import { DescriptionField } from './DescriptionField';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { observer } from 'mobx-react';
import { useEffect, useMemo } from 'react';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { store as mainStore } from 'web/application/store';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';
import { useLocationParams } from 'web/helpers/useLocationParams';

export const PayPage = observer(function PayPage() {
  const { push } = useHistory();
  const params = useParams<{ stationId: string; connectorId: string; cardId: string }>();
  const locationParams = useLocationParams();

  const station = useMemo(() => {
    return mainStore.stationsPromise?.value?.content?.find((item) => item?.id === +params?.stationId);
  }, [params, mainStore.stationsPromise?.value]);

  useEffect(() => {
    return () => mainStore.clearTransaction();
  }, []);

  useEffect(() => {
    if (mainStore.transactionPromise?.fulfilled) {
      push(ROUTES.CHARGE);
    }
  }, [mainStore.transactionPromise?.fulfilled]);

  useEffect(() => {
    if (mainStore.transactionPromise?.error) {
      push(ROUTES.PAY_ERROR);
    }
  }, [mainStore.transactionPromise?.error]);

  function handleStart() {
    const sum = locationParams.get('sum') || 0;
    const power = locationParams.get('power') || 0;
    mainStore.startTransaction(+params?.connectorId, +sum, +power);
  }

  return (
    <Box flex={1}>
      <Header title="Начните зарядку" showBackButton showProfileButton={false} />
      <Box flex={1} />
      <Fly/>

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
        <Button label="Оплатить и зарядить" disabled={mainStore.transactionPromise?.pending} onClick={handleStart} />
      </Box>
    </Box>
  );
});
