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
      <svg width="100%" height="100" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M80 24.6502C80 13.9818 71.3378 5.33333 60.6694 5.33333V5.33333C49.9857 5.33333 41.3111 13.9941 41.3111 24.6778V43.967H60.6832C71.3515 43.967 80 35.3186 80 24.6502V24.6502Z"
          fill="#D2E4FF"
        />
        <path
          d="M9.33332 61.3333C9.33331 69.4335 15.8998 76 24 76V76C32.1001 76 38.6666 69.4335 38.6666 61.3333L38.6666 46.6667L24 46.6667C15.8998 46.6667 9.33332 53.2332 9.33332 61.3333V61.3333Z"
          fill="#D2E4FF"
        />
        <path
          d="M70.6667 61.3333C70.6667 69.4335 64.1002 76 56 76V76C47.8998 76 41.3333 69.4335 41.3333 61.3333L41.3333 56.6074L48.6667 46.6667L56 46.6667C64.1002 46.6667 70.6667 53.2332 70.6667 61.3333V61.3333Z"
          fill="#D2E4FF"
        />
        <path
          d="M0 24.6502C0 13.9818 8.66223 5.33332 19.3306 5.33332V5.33332C30.0143 5.33332 38.6889 13.9941 38.6889 24.6778V35.4354L32.2407 43.967H19.3168C8.64844 43.967 0 35.3185 0 24.6502V24.6502Z"
          fill="#D2E4FF"
        />
      </svg>

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
