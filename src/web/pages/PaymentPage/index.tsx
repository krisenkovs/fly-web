import { Input } from './Input';
import { Skeleton } from 'components';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Pressable } from 'components/Pressable';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { CoinIcon, LightIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { store } from 'web/application/store';
import { CardView } from 'web/components/CardView';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';

export const PaymentPage = observer(() => {
  const [sum, setSum] = useState(0);
  const [power, setPower] = useState(0);
  const history = useHistory();
  const params = useParams<{ stationId: string; connectorId: string }>();

  useEffect(() => {
    if (store.tieCardPromise?.fulfilled) {
      if (store.tieCardPromise.value?.redirectUrl) {
        window.location.href = store.tieCardPromise.value?.redirectUrl;
      }
    }
  }, [store.tieCardPromise?.fulfilled]);

  const station = useMemo(() => {
    return store.stationsPromise?.value?.content?.find((item) => item?.id === +params?.stationId);
  }, [params, store.stationsPromise?.value]);

  function handlePress() {
    history.push(`${generatePath(ROUTES.PAY, { ...params, cardId: 1 })}?sum=${sum}&power=${power}`);
  }

  function handleAddCardPress() {
    store.tieCard(window.location.href);
  }

  function handleChangeSum(value: number) {
    setSum(value);
    if (station?.rate) {
      setPower(Math.trunc(value / station?.rate));
    }
  }

  function handleChangePower(value: number) {
    setPower(value);
    if (station?.rate) {
      setPower(Math.trunc(value * station?.rate));
    }
  }

  return (
    <>
      <Box flex={1}>
        <Header showProfileButton={false} showBackButton title="Цена и киловаты" />
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
            {!store.cardPromise?.value && store.cardPromise?.fulfilled && (
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
            {store.cardPromise?.value && <CardView card={store.cardPromise?.value} />}
          </Box>
          <Box flex={1} />
          <Button label="Далее" disabled={!sum || !power || !store?.cardPromise?.value} onClick={handlePress} />
        </Box>
      </Box>
    </>
  );
});
