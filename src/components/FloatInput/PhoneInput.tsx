import styles from 'components/FloatInput/styles.module.css';
import React, { ChangeEvent, FC, KeyboardEvent } from 'react';

type Props = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  className?: string;
  readonly?: boolean;
  label?: string;
};

export const PhoneInput: FC<Props> = ({ className, value, onChange, name, readonly = false, label }) => {
  function handleKeyDown(e: KeyboardEvent) {
    const selectionStart = (e?.currentTarget as HTMLInputElement).selectionStart;
    const symbols =
      selectionStart === 0
        ? ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+']
        : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'];
    if (!symbols.includes(e.key)) {
      e.preventDefault();
    }
  }

  return (
    <>
      <input
        value={value}
        onInput={onChange}
        name={name}
        autoComplete="none"
        id={name}
        className={className}
        readOnly={readonly}
        maxLength={13}
        onKeyDown={handleKeyDown}
      />
      <label className={value && styles.floatInputFilled}>{label}</label>
    </>
  );
};
