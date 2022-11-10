import { Box, Typography } from 'components';
import { COLORS } from 'constant';
import React, { useMemo } from 'react';
import { PAYMENT_TYPE, POWER_TYPE } from 'web/pages/StationPage/Connector/Payment/types';

type Props = {
  powerType: POWER_TYPE;
  paymentType: PAYMENT_TYPE;
  power: number;
};

export function InfoText({ powerType, paymentType, power }: Props) {
  const text = useMemo(() => {
    switch (powerType) {
      case POWER_TYPE.FULL:
        return paymentType === PAYMENT_TYPE.CARD
          ? `До старта с карты будет списана сумма, эквивалентная ${power} kWh. Сдача будет возвращена после завершения зарядки`
          : 'После завершения со счета будет списана сумма, соответствующая объему заправленной энергии';

      case POWER_TYPE.MIDDLE:
        return paymentType === PAYMENT_TYPE.CARD
          ? `При оплате картой будет списана стоимость эквивалентная за ${Math.round(power * 0.8)} kWh.`
          : 'После завершения со счета будет списана сумма, соответствующая объему заправленной энергии';

      case POWER_TYPE.MANUAL:
        return paymentType === PAYMENT_TYPE.CARD
          ? `До старта зарядки с карты будет списана указанная сумма`
          : 'После завершени зарядк со счета будет списана указанная сумма';
      default:
        return '';
    }
  }, [powerType, paymentType, power]);

  return (
    <Box marginTop={8} marginBottom={20} flex={1}>
      <Typography color={COLORS.BLACK} weight={400} size={12} lineHeight={18} textAlign="center">
        {text}
      </Typography>
    </Box>
  );
}
