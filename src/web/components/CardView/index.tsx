import { Box, Typography } from 'components';
import { COLORS } from 'constant';
import { VisaIcon } from 'icons';
import React from 'react';
import { CardType } from 'web/types';

type Props = {
  card: CardType;
};

export function CardView({ card }: Props) {
  return (
    <Box
      backgroundColor={COLORS.PALE_BLUE}
      height={80}
      boxSizing="border-box"
      flexDirection="row"
      borderRadius={8}
      paddingTop={16}
      paddingLeft={12}
      paddingRight={12}
      paddingBottom={16}
    >
      <Box alignItems="center" flex={1} flexDirection="row">
        <VisaIcon />
        <Box flex={1} marginLeft={12} marginRight={12}>
          <Typography color={COLORS.BLACK} weight={700} size={14} lineHeight={18}>
            {`•••• ${card?.last4}`}
          </Typography>
        </Box>
        <Typography color={COLORS.BLACK} weight={700} size={14} lineHeight={18}>
          {`${card?.expMonth}/${card?.expYear}`}
        </Typography>
      </Box>
    </Box>
  );
}
