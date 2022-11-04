import styles from './styles.module.css';
import { Box } from 'components/Box';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import React from 'react';

type Props = {
  label: string;
  value?: string | number;
};

export const DescriptionField = ({ label, value }: Props) => {
  return (
    <Box className={styles.content} paddingLeft={16} paddingRight={16} marginBottom={20}>
      <Box flexDirection="row" paddingBottom={20}>
        <Box flex={1}>
          <Typography size={14} weight={400} lineHeight={18} color={COLORS.LIGHT_BLACK}>
            {label}
          </Typography>
        </Box>
        <Typography size={14} weight={400} lineHeight={18} color={COLORS.BLACK}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};
