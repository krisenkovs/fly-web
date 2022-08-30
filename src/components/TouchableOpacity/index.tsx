import styles from './styles.module.css';
import classNames from 'classnames';
import React, { CSSProperties, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  onPress?: () => void;
  style?: CSSProperties;
  className?: string;
}>;

export function TouchableOpacity({ children, onPress, style, className }: Props) {
  return (
    <div onClick={onPress} className={classNames(styles.container, className)} style={style} >
      {children}
    </div>
  );
}
