import styles from 'components/FloatInput/styles.module.css';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

type Props = {
  onChange?: (value: string) => void;
  value?: string;
  name?: string;
  className?: string;
  readonly?: boolean;
  label?: string;
  max?: number;
  precision?: 0 | 1 | 2;
};

const REGEXP = [/^\d+/, /^\d+([,.]\d)?/, /^\d+([,.]\d{1,2})?/];

export const NumberInput: FC<Props> = ({
  precision = 0,
  className,
  value,
  onChange,
  name,
  readonly = false,
  label,
  max,
}) => {
  const [input, setInput] = useState({ value });

  useEffect(() => {
    setInput({ value });
  }, [value]);

  function handleBlur(e: ChangeEvent<HTMLInputElement>) {
    const regexp = REGEXP[precision];
    const inputValue = e.target?.value?.match(regexp as RegExp)?.[0] || '';
    if (max !== undefined && Number(inputValue) > Number(max)) {
      setInput({ value: max.toString() });
      onChange?.(max.toString());
    } else {
      setInput({ value: inputValue });
      onChange?.(inputValue);
    }
  }

  return (
    <>
      <input
        value={input?.value}
        onInput={handleBlur}
        onBlur={handleBlur}
        name={name}
        autoComplete="none"
        id={name}
        type="number"
        lang="en"
        step={0.01}
        className={className}
        readOnly={readonly}
      />
      <label className={value && styles.floatInputFilled}>{label}</label>
    </>
  );
};
