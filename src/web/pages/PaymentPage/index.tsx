import { Input } from './Input';
import { Payment } from './widget';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Pressable } from 'components/Pressable';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { CoinIcon, LightIcon } from 'icons';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';

export const PaymentPage = observer(() => {
  const [sum, setSum] = useState(0);
  const [power, setPower] = useState(0);
  const { push } = useHistory();
  const params = useParams<{ stationId: string; connectorId: string }>();

  function handlePress() {
    push(`${generatePath(ROUTES.PAY, { ...params, cardId: 1 })}?sum=${sum}&power=${power}`);
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
          <Input icon={<CoinIcon />} title="BYN" values={[15, 25, 50, 75]} onChange={setSum} value={sum} />
          <Box marginTop={40}>
            <Input icon={<LightIcon />} title="Киловаты" values={[15, 25, 50, 75]} onChange={setPower} value={power} />
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
