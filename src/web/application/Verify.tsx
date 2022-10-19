import { Box } from 'components/Box';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import React, { FC } from 'react';
import { Header } from 'theme/components/Header';

export const Verify: FC = () => {
  return (
    <Box flex={1}>
      <Header
        title={
          <>
            <span>Подтвердите</span>
            <br />
            <span>номер телефона</span>
          </>
        }
      />
      <Box flex={1} paddingTop={24} paddingLeft={16} paddingRight={16} paddingBottom={40}>
        <Typography color={COLORS.BLACK} size={14} lineHeight={24} weight={400}>
          Мы отправили код на номер <b>+375 29 555-44-88</b> Введите 4-х значный код из СМС
        </Typography>
        <Box flexDirection="row">
          <input maxLength={1} style={{ fontSize: '64px', outline: 'none', border: 'none' }} />
        </Box>
      </Box>
    </Box>
  );
};
