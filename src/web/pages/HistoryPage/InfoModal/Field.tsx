import { Box, Typography } from 'components';
import { COLORS } from 'constant';
import React from 'react';

type Props = {
  label?: string;
  value?: string | number;
};

export function Field({ label, value }: Props) {
  return (
    <Box marginTop={20}>
      <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
        {label}
      </Typography>
      <Box marginTop={8}>
        <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
