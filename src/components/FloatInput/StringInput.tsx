import styles from 'components/FloatInput/styles.module.css';
import React, { ChangeEvent, FC } from 'react';

type Props = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  className?: string;
  readonly?: boolean;
  label?: string;
  maxLength?: number;
};

export const StringInput: FC<Props> = ({
  maxLength = 255,
  className,
  value,
  onChange,
  name,
  readonly = false,
  label,
}) => {
  return (
    <>
      <input
        value={value || ''}
        onInput={onChange}
        name={name}
        autoComplete="none"
        id={name}
        className={className}
        readOnly={readonly}
        maxLength={maxLength}
      />
      <label className={value && styles.floatInputFilled}>{label}</label>
    </>
  );
};
