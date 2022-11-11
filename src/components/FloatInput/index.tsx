import { PasswordInput } from './PasswordInput';
import { StringInput } from './StringInput';
import styles from './styles.module.css';
import { NumberInput } from 'components/FloatInput/NumberInput';
import { PhoneInput } from 'components/FloatInput/PhoneInput';
import React, { ChangeEvent, CSSProperties, FC, useMemo } from 'react';

type Props = {
  value?: string;
  label?: string;
  hint?: string;
  onChange?: (value?: string) => void;
  name?: string;
  type?: 'text' | 'password' | 'number' | 'phone';
  style?: CSSProperties;
  inputClassName?: string;
  hideHint?: boolean;
  onClick?: () => void;
  readonly?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  precision?: 0 | 1 | 2;
};

export const FloatInput: FC<Props> = ({
  inputClassName,
  name,
  onChange,
  value,
  label,
  hint,
  type = 'text',
  style,
  hideHint,
  onClick,
  readonly = false,
  max,
  maxLength,
  precision,
}) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value);
  }

  function handleNumberChange(value: string) {
    onChange?.(value);
  }

  const input = useMemo(() => {
    if (type === 'password') {
      return <PasswordInput value={value} onChange={handleChange} name={name} label={label} />;
    }
    if (type === 'number') {
      return (
        <NumberInput
          value={value}
          onChange={handleNumberChange}
          name={name}
          label={label}
          max={max}
          className={inputClassName}
          readonly={readonly}
          precision={precision}
        />
      );
    }
    if (type === 'phone') {
      return (
        <PhoneInput
          value={value}
          onChange={handleNumberChange}
          name={name}
          label={label}
          className={inputClassName}
          readonly={readonly}
        />
      );
    }

    return (
      <StringInput
        value={value}
        onChange={handleChange}
        name={name}
        className={inputClassName}
        readonly={readonly}
        label={label}
        maxLength={maxLength}
      />
    );
  }, [type, onChange, name, value, handleChange, inputClassName, label, max, maxLength, precision]);

  return (
    <div style={style} onClick={onClick}>
      <div className={`${styles.floatInput} ${hint && styles.floatInputError} `}>{input}</div>
      {!hideHint && <div className={styles.floatInputHint}>{hint}</div>}
    </div>
  );
};
