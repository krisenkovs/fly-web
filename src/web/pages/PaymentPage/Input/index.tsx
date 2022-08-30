import styles from './styles.module.css';
import { Box } from 'components/Box';
import { FloatInput } from 'components/FloatInput';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import React, { ReactElement } from 'react';

type Props = {
  icon: ReactElement;
  title: string;
  value?: number;
  values: number[];
  onChange?: (value: number) => void;
};

export function Input({ value, icon, title, values, onChange }: Props) {
  return (
    <Box>
      <Box marginLeft={32}>
        <Typography color={COLORS.LIGHT_BLACK} weight={500} size={12} lineHeight={15}>
          {title}
        </Typography>
      </Box>
      <Box flexDirection="row" alignItems="center" marginTop={8}>
        {icon}
        <Box marginLeft={8} flex={1}>
          <input
            type="number"
            className={styles.input}
            onChange={(e) => onChange?.(Number(e.target?.value))}
            value={value?.toString()}
          />
        </Box>
      </Box>
      <Box marginLeft={32} flexDirection="row" marginTop={12}>
        {values.map((item, index) => (
          <TouchableOpacity onPress={() => onChange?.(item)} className={styles.button} key={index}>
            <Box
              marginLeft={index ? 8 : 0}
              height={32}
              alignItems="center"
              justifyContent="center"
              backgroundColor={COLORS.PALE_BLUE}
              borderRadius={8}
            >
              <Typography color={COLORS.BLUE} weight={600} size={14} lineHeight={18}>
                {item}
              </Typography>
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
    </Box>
  );
}
