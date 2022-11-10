import { Box, Typography } from 'components';
import { COLORS } from 'constant';
import { BatteryFullIcon } from 'icons';
import React from 'react';

export function FullPowerItem() {
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
      <Box
        width={100}
        height={100}
        borderRadius={8}
        paddingTop={15}
        paddingLeft={13}
        backgroundColor={COLORS.WHITE}
        borderBottomRightRadius={80}
        boxSizing="border-box"
      >
        <BatteryFullIcon />
      </Box>
      <Box marginTop={20} marginBottom={14} flex={1}>
        <Typography color={COLORS.BLACK} weight={700} size={18} lineHeight={24}>
          Полный бак
        </Typography>
      </Box>
      <Typography color={COLORS.LIGHT_BLACK} weight={400} size={12} lineHeight={18}>
        Полная зарядка до 100% емкости батареи вашего электромобиля
      </Typography>
    </Box>
  );
}
