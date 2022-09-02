import React, { useMemo } from 'react';

import styles from './styles.module.css';

type Props = {
  size?: number;
};

export function Avatar({ size = 14 }: Props) {
  const style = useMemo(() => {
    return {
      height: `${size}px`,
      width: `${size}px`,
      borderRadius: `${size}px`,
    };
  }, [size]);

  return (
    <div className={styles.container}>
      <div className={styles.content} style={style} />
      <div className={styles.skeleton} />
    </div>
  );
}
