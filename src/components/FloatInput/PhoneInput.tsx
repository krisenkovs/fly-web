import { Box } from 'components/Box';
import styles from 'components/FloatInput/styles.module.css';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import React, { ChangeEvent, FC } from 'react';

type Props = {
  onChange?: (value: string) => void;
  value?: string;
  name?: string;
  className?: string;
  readonly?: boolean;
  label?: string;
};

export const PhoneInput: FC<Props> = ({ className, value, onChange, name, readonly = false, label }) => {
  function handleBlur(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target?.value?.match(/[\d.]{1,12}/)?.[0] || '';
    onChange?.(inputValue);
  }

  return (
    <Box flexDirection="row" alignItems="flex-end">
      <Typography color={COLORS.BLACK} size={16} lineHeight={18} weight={400}>
        +
      </Typography>
      <input
        value={`${value}`.replace('+', '')}
        onInput={handleBlur}
        onBlur={handleBlur}
        name={name}
        autoComplete="none"
        id={name}
        className={className}
        readOnly={readonly}
        type="number"
        maxLength={13}
      />
      <label className={value && styles.floatInputFilled}>{label}</label>
    </Box>
  );
};
