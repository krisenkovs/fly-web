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
  hideHint?: boolean;
  onClick?: () => void;
  readonly?: boolean;
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
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange],
  );

  const input = useMemo(() => {
    return type === 'password' ? (
      <PasswordInput value={value} onChange={handleChange} name={name} label={label} />
    ) : (
      <StringInput
        value={value}
        onChange={handleChange}
        name={name}
        type={type}
        className={inputClassName}
        readonly={readonly}
        label={label}
      />
    );
  }, [type, onChange, name, value, handleChange, inputClassName, label]);

  return (
    <div style={style} onClick={onClick}>
      <div className={`${styles.floatInput} ${hint && styles.floatInputError} `}>{input}</div>
      {!hideHint && <div className={styles.floatInputHint}>{hint}</div>}
    </div>
  );
};
