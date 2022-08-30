import React from 'react';

import styles from './styles.module.css';

export function Loader() {
  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.content}></div>
      </div>
    </>
  );
}
