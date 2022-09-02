import styles from './styles.module.css';
import { Loader } from 'components/Loader';
import React, { CSSProperties, FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  label?: string;
  onClick: () => void;
  style?: CSSProperties;
  disabled?: boolean;
  loading?: boolean;
}>;

export const Button: FC<Props> = ({ onClick, label, style, disabled, loading = false }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${disabled ? styles.disabled : ''} ${loading ? styles.loading : ''}`}
      style={style}
    >
      {loading ? <Loader /> : label}
    </button>
  );
};
