import { Box, Typography } from 'components';
import { COLORS } from 'constant';
import { BatteryMiddleIcon } from 'icons';
import React from 'react';

export function MiddlePowerItem() {
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
        <BatteryMiddleIcon />
      </Box>
      <Box marginTop={20} marginBottom={14} flex={1}>
        <Typography color={COLORS.BLACK} weight={700} size={18} lineHeight={24}>
          Зарядить на 80%
        </Typography>
      </Box>
      <Typography color={COLORS.LIGHT_BLACK} weight={400} size={12} lineHeight={18}>
        Это наиболее щадящий вариант который позволяет продлить ресурс батареи
      </Typography>
    </Box>
  );
}
