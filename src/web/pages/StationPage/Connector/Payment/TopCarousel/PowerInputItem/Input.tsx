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
  precision?: 0 | 1 | 2;
  max?: number;
};

export function Input({ value, icon, title, values, onChange, precision, max }: Props) {
  function handleChange(value?: string) {
    onChange?.(parseFloat(value || ''));
  }
  return (
    <Box>
      <Box flexDirection="row" alignItems="flex-end">
        <Box marginBottom={4}>{icon}</Box>
        <Box marginLeft={8} flex={1}>
          <FloatInput
            type="number"
            label={title}
            onChange={handleChange}
            value={value?.toString()}
            hideHint
            max={max}
            precision={precision}
          />
        </Box>
      </Box>
      <Box marginLeft={32} flexDirection="row" marginTop={12}>
        {values.map((item, index) => (
          <Box flex={1} key={index}>
            <TouchableOpacity onPress={() => onChange?.(item)}>
              <Box
                marginLeft={index ? 8 : 0}
                height={32}
                alignItems="center"
                justifyContent="center"
                backgroundColor={COLORS.WHITE}
                borderRadius={8}
              >
                <Typography color={COLORS.BLUE} weight={600} size={14} lineHeight={18}>
                  {item}
                </Typography>
              </Box>
            </TouchableOpacity>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
