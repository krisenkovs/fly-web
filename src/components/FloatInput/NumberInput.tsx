import styles from 'components/FloatInput/styles.module.css';
import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';

type Props = {
  onChange?: (value: string) => void;
  value?: string;
  name?: string;
  className?: string;
  readonly?: boolean;
  label?: string;
  max?: number;
};

export const NumberInput: FC<Props> = ({ max, className, value, onChange, name, readonly = false, label }) => {
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  function handleKeyDown(e: KeyboardEvent) {
    if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ',', 'Backspace'].includes(e.key)) {
      e.preventDefault();
    }
  }
  function handleBlur(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target?.value;
    if (max !== undefined && Number(inputValue) > max) {
      onChange?.(String(max));
      return;
    }
    onChange?.(inputValue);
  }

  return (
    <>
      <input
        value={input}
        onInput={handleBlur}
        onBlur={handleBlur}
        name={name}
        autoComplete="none"
        id={name}
        className={className}
        readOnly={readonly}
        onKeyDown={handleKeyDown}
      />
      <label className={value && styles.floatInputFilled}>{label}</label>
    </>
  );
};
