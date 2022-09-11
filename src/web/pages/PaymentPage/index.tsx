import { Input } from './Input';
import { Payment } from './widget';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Pressable } from 'components/Pressable';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { CoinIcon, LightIcon } from 'icons';
import { observer } from 'mobx-react';
import React, { useMemo, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { store as mainStore } from 'web/application/store';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';

export const PaymentPage = observer(() => {
  const [sum, setSum] = useState(0);
  const [power, setPower] = useState(0);
  const history = useHistory();
  const params = useParams<{ stationId: string; connectorId: string }>();

  const station = useMemo(() => {
    return mainStore.stationsPromise?.value?.content?.find((item) => item?.id === +params?.stationId);
  }, [params, mainStore.stationsPromise?.value]);

  function handlePress() {
    history.push(`${generatePath(ROUTES.PAY, { ...params, cardId: 1 })}?sum=${sum}&power=${power}`);
  }

  function handleWidgetClose(status: string) {
    console.log(status);
  }

  function handleAddCardPress() {
    Payment(handleWidgetClose);
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
            <Pressable onPress={handleAddCardPress}>
              <Box
                backgroundColor={COLORS.PALE_BLUE}
                paddingTop={30}
                paddingBottom={30}
                flexDirection="row"
                justifyContent="center"
                borderRadius={8}
              >
                <Typography color={COLORS.BLUE} weight={600} size={14} lineHeight={18}>
                  Добавить карту для оплаты
                </Typography>
              </Box>
            </Pressable>
          </Box>
          <Box flex={1} />
          <Button label="Далее" disabled={!sum || !power} onClick={handlePress} />
        </Box>
      </Box>
    </>
  );
});
