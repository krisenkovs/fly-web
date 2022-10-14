import styles from 'components/FloatInput/styles.module.css';
import React, { ChangeEvent, FC } from 'react';

type Props = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  type?: 'number' | 'text';
  className?: string;
  readonly?: boolean;
  label?: string;
};

export const StringInput: FC<Props> = ({ className, value, onChange, name, type, readonly = false, label }) => {
  return (
    <>
      <input
        value={value || ''}
        onInput={onChange}
        name={name}
        autoComplete="none"
        id={name}
        type={type}
        className={className}
        readOnly={readonly}
      />
      <label className={value && styles.floatInputFilled}>{label}</label>
    </>
  );
};
