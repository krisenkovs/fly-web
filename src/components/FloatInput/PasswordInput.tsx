import { Box } from 'components/Box';
import styles from 'components/FloatInput/styles.module.css';
import { EyeClosedIcon } from 'icons/EyeClosedIcon';
import { EyeIcon } from 'icons/EyeIcon';
import React, { ChangeEvent, FC, useState } from 'react';

type Props = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  label?: string;
};

export const PasswordInput: FC<Props> = ({ value, onChange, name, label }) => {
  const [hidden, setHidden] = useState(true);

  function handleClick() {
    setHidden((prevState) => !prevState);
  }

  return (
    <Box flexDirection="row" alignItems="flex-end">
      <input
        type={hidden ? 'password' : 'text'}
        value={value || ''}
        onInput={onChange}
        name={name}
        autoComplete="none"
        id={name}
        className={styles.flex}
      />
      <label className={value && styles.floatInputFilled}>{label}</label>
      <div className={styles.cursorPointer} onClick={handleClick}>
        {hidden ? <EyeClosedIcon /> : <EyeIcon />}
      </div>
    </Box>
  );
};
