import styles from 'components/FloatInput/styles.module.css';
import React, { ChangeEvent, FC } from 'react';

type Props = {
  onChange?: (value: string) => void;
  value?: string;
  name?: string;
  className?: string;
  readonly?: boolean;
  label?: string;
  max?: number;
};

export const NumberInput: FC<Props> = ({ className, value, onChange, name, readonly = false, label }) => {
  function handleBlur(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target?.value?.match(/[\d.]*/)?.[0] || '';
    onChange?.(inputValue);
  }

  return (
    <>
      <input
        value={value}
        onInput={handleBlur}
        onBlur={handleBlur}
        name={name}
        autoComplete="none"
        id={name}
        type="number"
        className={className}
        readOnly={readonly}
      />
      <label className={value && styles.floatInputFilled}>{label}</label>
    </>
  );
};
