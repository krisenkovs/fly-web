import styles from './styles.module.css';
import React from 'react';

type Props = {
  absolute?: boolean;
  showOverlay?: boolean;
};

export function Loader({ absolute = true, showOverlay = false }: Props) {
  return absolute ? (
    <>
      <div className={`${styles.overlay} ${showOverlay ? styles.overlayGrey : ''}`} />
      <div className={styles.container}>
        <div className={styles.content}></div>
      </div>
    </>
  ) : (
    <div className={styles.content}></div>
  );
}
