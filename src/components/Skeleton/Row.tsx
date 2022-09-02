import React, { useMemo } from 'react';

import styles from './styles.module.css';

type Props = {
  height?: number;
};

export function Row({ height = 14 }: Props) {
  const style = useMemo(() => {
    return {
      height: `${height}px`,
      borderRadius: `${height / 2}px`,
    };
  }, [height]);

  return (
    <div className={styles.container}>
      <div className={styles.content} style={style} />
      <div className={styles.skeleton} />
    </div>
  );
}
