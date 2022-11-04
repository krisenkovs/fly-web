import { Typography } from 'components';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { store as mainStore } from 'web/application/store';
import { BalanceView } from 'web/components/BalanceView';
import { CardView } from 'web/components/CardView';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';
import { Carousel } from 'web/pages/StationPage/Connector/Payment/Carousel';
import { FullPowerItem } from 'web/pages/StationPage/Connector/Payment/FullPowerItem';
import { MiddlePowerItem } from 'web/pages/StationPage/Connector/Payment/MiddlePowerItem';
import { PowerInputItem } from 'web/pages/StationPage/Connector/Payment/PowerInputItem';
import { store } from 'web/pages/StationPage/store';
import { STEPS_CONNECTOR } from 'web/pages/StationPage/types';

export const Payment = observer(() => {
  const { replace } = useHistory();
  const { sum, power, setPower, tieCardPromise, stationPromise, setStep, setPayFromAccount } = store;
  const { cardPromise, carPromise } = mainStore;

  useEffect(() => {
    setPower(carPromise?.value?.powerReserve || 60);
  }, []);

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
    if (key === 'card') {
      setPayFromAccount(false);
    } else {
      setPayFromAccount(true);
    }
  }

  function handleChangePower(key?: string | number) {
    if (key === 'fullPower') {
      setPower(carPromise?.value?.batteryCapacity || 60);
    }
    if (key === 'middlePower') {
      setPower(Math.round((carPromise?.value?.batteryCapacity || 60) * 0.8));
    }
    if (key === 'input') {
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
          <Carousel
            data={[
              { key: 'fullPower', content: <FullPowerItem /> },
              { key: 'middlePower', content: <MiddlePowerItem /> },
              {
                key: 'input',
                content: <PowerInputItem />,
              },
            ]}
            onChange={handleChangePower}
          />

          <Box marginTop={40} marginBottom={20}>
            <Typography color={COLORS.BLACK} weight={700} size={16} lineHeight={20}>
              Способ оплаты
            </Typography>
          </Box>

          {cardPromise?.value && (
            <Carousel
              data={[
                { key: 'card', content: <CardView /> },
                { key: 'balance', content: <BalanceView /> },
              ]}
              onChange={handleChangePayment}
            />
          )}
          <Box marginTop={40} marginBottom={20} flex={1}>
            <Typography color={COLORS.BLACK} weight={400} size={12} lineHeight={18} textAlign="center">
              При оплате картой будет списана стоимость эквивалентная за 60 kWh. Сдача будет возвращена после завершения
              зарядки
            </Typography>
          </Box>
          <Button label="Далее" disabled={!sum || !power} onClick={handlePress} />
        </Box>
      </Box>
    </>
  );
});
