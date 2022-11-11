import { Box } from 'components';
import { COLORS } from 'constant';
import { CoinIcon, LightIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Input } from 'web/pages/StationPage/Connector/Payment/TopCarousel/PowerInputItem/Input';
import { store } from 'web/pages/StationPage/store';

export const PowerInputItem = observer(function () {
  const { sum, setSum, power, setPower } = store;
  return (
    <Box
      paddingTop={26}
      boxSizing="border-box"
      paddingBottom={26}
      paddingRight={16}
      paddingLeft={16}
      backgroundColor={COLORS.PALE_BLUE}
      borderRadius={8}
      height={244}
    >
      <Input icon={<CoinIcon />} title="BYN" values={[15, 25, 50, 75]} onChange={setSum} value={sum} precision={2} />
      <Box flex={1} />
      <Input
        icon={<LightIcon />}
        title="Киловаты"
        values={[15, 25, 50, 75]}
        onChange={setPower}
        value={power}
        precision={1}
      />
    </Box>
  );
});
