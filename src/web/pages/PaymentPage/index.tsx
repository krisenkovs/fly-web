
import { Input } from './Input';
import { Payment } from './widget';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Pressable } from 'components/Pressable';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { CoinIcon, LightIcon } from 'icons';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { store as mainStore } from 'web/application/store';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';

export const PaymentPage = observer(() => {
  const navigation = useNavigate();

  /*useEffect(() => {
    mainStore?.currentTransactionPromise?.value?.status === 'CREATED' && navigation(ROUTES.MAIN);
  }, [mainStore?.currentTransactionPromise?.value]);*/

  function handlePress() {
    navigation(`${ROUTES.PAY}`);
  }

  function handleAddCardPress() {
    Payment();
  }

  return (
    <>
      <Box flex={1}>
        <Header showProfileButton={false} showBackButton title="Цена и киловаты" />
        <Box flex={1} paddingLeft={16} paddingRight={16} paddingBottom={48}>
          <Box flex={1} />
          <Input
            icon={<CoinIcon />}
            title="BYN"
            values={[15, 25, 50, 75]}
            onChange={mainStore.setSelectedSum}
            value={mainStore.selectedSum}
          />
          <Box marginTop={40}>
            <Input
              icon={<LightIcon />}
              title="Киловаты"
              values={[15, 25, 50, 75]}
              onChange={mainStore.setSelectedPower}
              value={mainStore.selectedPower}
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
          <Button label="Далее" disabled={!mainStore.selectedPower || !mainStore.selectedSum} onClick={handlePress} />
        </Box>
      </Box>
    </>
  );
});
