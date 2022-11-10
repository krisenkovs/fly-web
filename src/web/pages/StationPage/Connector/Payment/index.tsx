import { Typography } from 'components';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { store as mainStore } from 'web/application/store';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';
import { BottomCarousel } from 'web/pages/StationPage/Connector/Payment/BottomCarousel';
import { InfoText } from 'web/pages/StationPage/Connector/Payment/InfoText';
import { TopCarousel } from 'web/pages/StationPage/Connector/Payment/TopCarousel';
import { PAYMENT_TYPE, POWER_TYPE } from 'web/pages/StationPage/Connector/Payment/types';
import { store } from 'web/pages/StationPage/store';
import { STEPS_CONNECTOR } from 'web/pages/StationPage/types';

export const Payment = observer(() => {
  const { replace } = useHistory();
  const {
    sum,
    power,
    setPower,
    tieCardPromise,
    stationPromise,
    setStep,
    setPaymentType,
    setPowerType,
    powerType,
    paymentType,
  } = store;
  const { cardPromise, carPromise } = mainStore;

  useEffect(() => {
    setPower(carPromise?.value?.batteryCapacity || 60);
  }, [carPromise?.value, stationPromise?.value]);

  useEffect(() => {
    if (tieCardPromise?.fulfilled) {
      if (tieCardPromise.value?.redirectUrl) {
        window.location.href = tieCardPromise.value?.redirectUrl;
      }
    }
  }, [tieCardPromise?.fulfilled]);

  function handlePress() {
    setStep(STEPS_CONNECTOR.INFO);
  }

  function handleBackClick() {
    replace(generatePath(ROUTES.STATION, { stationId: `${stationPromise?.value?.id}` }));
  }

  function handleChangePayment(key?: string | number) {
    setPaymentType(key as PAYMENT_TYPE);
  }

  const fullPower = carPromise?.value?.batteryCapacity || 60;

  function handleChangePower(key?: string | number) {
    setPowerType(key as POWER_TYPE);
    if (key === POWER_TYPE.FULL) {
      setPower(fullPower);
    }
    if (key === POWER_TYPE.MIDDLE) {
      setPower(Math.round(fullPower * 0.8));
    }
    if (key === POWER_TYPE.MANUAL) {
      setPower(0);
    }
  }

  return (
    <>
      <Box flex={1}>
        <Header showProfileButton={false} showBackButton title="Цена и киловаты" onBackClick={handleBackClick} />
        <Box flex={1} paddingLeft={16} paddingRight={16} paddingBottom={48}>
          <Box marginTop={32} marginBottom={20}>
            <Typography color={COLORS.BLACK} weight={700} size={16} lineHeight={20}>
              Объем зарядки
            </Typography>
          </Box>
          <TopCarousel onChange={handleChangePower} />

          <Box flex={1} />

          <Box marginTop={8} marginBottom={20}>
            <Typography color={COLORS.BLACK} weight={700} size={16} lineHeight={20}>
              Способ оплаты
            </Typography>
          </Box>

          {cardPromise?.value && <BottomCarousel onChange={handleChangePayment} />}
          <Box flex={1} />
          <InfoText powerType={powerType} paymentType={paymentType} power={fullPower} />
          <Button label="Далее" disabled={!sum || !power} onClick={handlePress} />
        </Box>
      </Box>
    </>
  );
});
