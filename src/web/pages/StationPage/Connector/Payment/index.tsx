import { Skeleton } from 'components';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Pressable } from 'components/Pressable';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { CoinIcon, LightIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { CardView } from 'web/components/CardView';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';
import { Input } from 'web/pages/StationPage/Connector/Payment/Input';
import { store } from 'web/pages/StationPage/store';
import { STEPS_CONNECTOR } from 'web/pages/StationPage/types';

export const Payment = observer(() => {
  const { replace } = useHistory();
  const { sum, setSum, power, setPower, tieCardPromise, stationPromise, tieCard, cardPromise, setStep } = store;

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

  function handleAddCardPress() {
    tieCard(window.location.href);
  }

  function handleChangeSum(value: number) {
    setSum(value);
    if (stationPromise?.value?.rate) {
      setPower(Math.trunc(value / stationPromise.value?.rate));
    }
  }

  function handleChangePower(value: number) {
    setPower(value);
    if (stationPromise?.value?.rate) {
      setSum(Math.trunc(value * stationPromise.value?.rate));
    }
  }

  function handleBackClick() {
    replace(generatePath(ROUTES.STATION, { stationId: `${stationPromise?.value?.id}` }));
  }

  return (
    <>
      <Box flex={1}>
        <Header showProfileButton={false} showBackButton title="Цена и киловаты" onBackClick={handleBackClick} />
        <Box flex={1} paddingLeft={16} paddingRight={16} paddingBottom={48}>
          <Box flex={1} />
          <Input icon={<CoinIcon />} title="BYN" values={[15, 25, 50, 75]} onChange={handleChangeSum} value={sum} />
          <Box marginTop={40}>
            <Input
              icon={<LightIcon />}
              title="Киловаты"
              values={[15, 25, 50, 75]}
              onChange={handleChangePower}
              value={power}
            />
          </Box>
          <Box flex={1} />

          <Box paddingLeft={16} paddingRight={16}>
            {store.cardPromise?.pending && (
              <Box
                height={80}
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                paddingTop={16}
                paddingLeft={12}
                paddingRight={12}
                paddingBottom={16}
                boxSizing="border-box"
              >
                <Box flex={1}>
                  <Skeleton.Row height={32} />
                </Box>
              </Box>
            )}
            {!cardPromise?.value && cardPromise?.fulfilled && (
              <Pressable onPress={handleAddCardPress}>
                <Box
                  backgroundColor={COLORS.PALE_BLUE}
                  height={80}
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={8}
                  paddingTop={16}
                  paddingLeft={12}
                  paddingRight={12}
                  paddingBottom={16}
                  boxSizing="border-box"
                >
                  <Typography color={COLORS.BLUE} weight={600} size={14} lineHeight={18}>
                    Добавить карту для оплаты
                  </Typography>
                </Box>
              </Pressable>
            )}
            {cardPromise?.value && <CardView card={cardPromise?.value} />}
          </Box>
          <Box flex={1} />
          <Button label="Далее" disabled={!sum || !power || !cardPromise?.value} onClick={handlePress} />
        </Box>
      </Box>
    </>
  );
});
