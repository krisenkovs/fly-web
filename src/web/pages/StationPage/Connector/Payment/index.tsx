import { Typography } from 'components';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { store as mainStore } from 'web/application/store';
import { Header } from 'web/components/Header';
import { notification } from 'web/components/NotificationManager';
import { ERRORS, ROUTES } from 'web/constant';
import { BottomCarousel } from 'web/pages/StationPage/Connector/Payment/BottomCarousel';
import { InfoText } from 'web/pages/StationPage/Connector/Payment/InfoText';
import { TopCarousel } from 'web/pages/StationPage/Connector/Payment/TopCarousel';
import { POWER_TYPE } from 'web/pages/StationPage/Connector/Payment/types';
import { store } from 'web/pages/StationPage/store';
import { STEPS_CONNECTOR } from 'web/pages/StationPage/types';
import { PAYMENT_TYPE } from 'web/types';

export const Payment = observer(() => {
  const { replace } = useHistory();
  const {
    sum,
    power,
    tieCardPromise,
    stationPromise,
    preCheckTransactionPromise,
    setStep,
    setPaymentType,
    setPowerType,
    powerType,
    paymentType,
    percLimit,
    preCheckTransaction,
  } = store;
  const { carPromise } = mainStore;

  useEffect(() => {
    if (tieCardPromise?.fulfilled) {
      if (tieCardPromise.value?.redirectUrl) {
        window.location.href = tieCardPromise.value?.redirectUrl;
      }
    }
  }, [tieCardPromise?.fulfilled]);

  useEffect(() => {
    if (preCheckTransactionPromise?.fulfilled) {
      setStep(STEPS_CONNECTOR.INFO);
    }
  }, [preCheckTransactionPromise?.fulfilled]);

  useEffect(() => {
    if (preCheckTransactionPromise?.rejected) {
      notification({
        content: (
          <Typography color={COLORS.BLACK} weight={500} size={16} lineHeight={24}>
            {ERRORS[preCheckTransactionPromise?.error?.message || ''] || ERRORS['system-error']}
          </Typography>
        ),
      });
    }
  }, [preCheckTransactionPromise?.rejected]);

  function handleBackClick() {
    replace(generatePath(ROUTES.STATION, { stationId: `${stationPromise?.value?.id}` }));
  }

  function handleChangePayment(key?: string | number) {
    setPaymentType(key as PAYMENT_TYPE);
  }

  const fullPower = carPromise?.value?.batteryCapacity || 60;

  function handleChangePower(key?: string | number) {
    setPowerType(key as POWER_TYPE);
  }

  const isDisabled = useMemo(() => {
    if (paymentType === PAYMENT_TYPE.CARD && !mainStore?.cardPromise?.value?.brand) {
      return true;
    }
    if (!percLimit) {
      if (!sum || !power) {
        return true;
      }
    }
    return false;
  }, [paymentType, sum, power, mainStore?.cardPromise?.value?.brand, percLimit]);

  return (
    <>
      <Box flex={1}>
        <Header showProfileButton={false} showBackButton title="?????????????? ??????????????" onBackClick={handleBackClick} />
        <Box flex={1} paddingLeft={16} paddingRight={16} paddingBottom={48}>
          <Box marginTop={32} marginBottom={20}>
            <Typography color={COLORS.BLACK} weight={700} size={16} lineHeight={20}>
              ?????????? ??????????????
            </Typography>
          </Box>
          <TopCarousel onChange={handleChangePower} rate={stationPromise?.value?.rate} />

          <Box flex={1} />

          <Box marginTop={8} marginBottom={20}>
            <Typography color={COLORS.BLACK} weight={700} size={16} lineHeight={20}>
              ???????????? ????????????
            </Typography>
          </Box>

          <BottomCarousel onChange={handleChangePayment} />
          <Box flex={1} />
          <InfoText powerType={powerType} paymentType={paymentType} power={fullPower} />
          <Button
            label="??????????"
            disabled={isDisabled}
            onClick={preCheckTransaction}
            loading={preCheckTransactionPromise?.pending}
          />
        </Box>
      </Box>
    </>
  );
});
