import { PasswordInput } from './PasswordInput';
import { StringInput } from './StringInput';
import styles from './styles.module.css';
import React, { ChangeEvent, CSSProperties, FC, useCallback, useMemo } from 'react';

type Props = {
  value?: string;
  label?: string;
  hint?: string;
  onChange?: (value?: string) => void;
  name?: string;
  type?: 'text' | 'password' | 'number';
  style?: CSSProperties;
  inputClassName?: string;
};

export const FloatInput: FC<Props> = ({ inputClassName, name, onChange, value, label, hint, type = 'text', style }) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange],
  );

  const input = useMemo(() => {
    return type === 'password' ? (
      <PasswordInput value={value} onChange={handleChange} name={name} />
    ) : (
      <StringInput value={value} onChange={handleChange} name={name} type={type} className={inputClassName} />
    );
  }, [type, onChange, name, value, handleChange, inputClassName]);

  return (
    <div style={style}>
      <div className={`${styles.floatInput} ${hint && styles.floatInputError} `}>
        {input}
        <label className={value && styles.floatInputFilled}>{label}</label>
      </div>
      <div className={styles.floatInputHint}>{hint}</div>
    </div>
  );
};
