import styles from './styles.module.css';
import { Box } from 'components';
import React, { KeyboardEvent } from 'react';

type Props = {
  value?: string;
  onKeyPress?: (value: string) => void;
  id: string;
};

export function NumberInput({ value, onKeyPress, id }: Props) {
  function handleKeyDown(e: KeyboardEvent) {
    e.preventDefault();
    onKeyPress?.(e?.key);
  }

  return (
    <Box
      width={76}
      paddingBottom={12}
      paddingTop={12}
      paddingRight={12}
      paddingLeft={12}
      className={value ? styles.containerActive : styles.container}
      boxSizing="border-box"
    >
      <input
        maxLength={1}
        onKeyDown={handleKeyDown}
        className={styles.input}
        min={1}
        max={9}
        value={value}
        id={id}
        type="number"
      />
    </Box>
  );
}
