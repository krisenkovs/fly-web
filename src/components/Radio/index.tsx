import styles from './styles.module.css';
import { Box } from 'components/Box';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import React from 'react';

type Props = {
  checked?: boolean;
  label: string;
  onChecked?: () => void;
};

export function Radio({ checked, label, onChecked }: Props) {
  return (
    <label className={styles.content}>
      <input type="radio" checked={checked} onChange={onChecked} />
      <Box marginLeft={12}>
        <Typography color={COLORS.BLACK} weight={400} size={16} lineHeight={24}>
          {label}
        </Typography>
      </Box>
    </label>
  );
}
