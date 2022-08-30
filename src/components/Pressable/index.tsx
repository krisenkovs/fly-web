import React, { PropsWithChildren } from "react";

import styles from './styles.module.css';

type Props = PropsWithChildren<{
  onPress: () => void;
}>;

export function Pressable({ children, onPress }: Props) {
  return (
    <div onClick={onPress} className={styles.container}>
      {children}
    </div>
  );
}
