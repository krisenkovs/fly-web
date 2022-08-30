import React, { CSSProperties, FC, PropsWithChildren } from 'react';

import styles from './styles.module.css';

type Props = PropsWithChildren<{
  label?: string;
  onClick: () => void;
  style?: CSSProperties;
  disabled?: boolean;
}>;

export const Button: FC<Props> = ({ onClick, label, style, disabled }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${disabled ? styles.disabled : ''}`} style={style}>
      {label}
    </button>
  );
};
