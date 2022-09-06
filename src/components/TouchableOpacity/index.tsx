import styles from './styles.module.css';
import classNames from 'classnames';
import React, { CSSProperties, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  onPress?: () => void;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
}>;

export function TouchableOpacity({ children, onPress, style, className, disabled }: Props) {
  return (
    <div
      onClick={onPress}
      className={classNames(styles.container, className, { [`${styles.disabled}`]: disabled })}
      style={style}
    >
      {children}
    </div>
  );
}
