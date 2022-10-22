import styles from './styles.module.css';
import { Box } from 'components/Box';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { QrReader } from 'react-qr-reader';
import { Header } from 'web/components/Header';

export const ScannerPage = observer(() => {
  return (
    <Box flex={1} position="relative">
      <Header showProfileButton={false} showBackButton title="Отсканируйте QR код" className={styles.header} />
      <QrReader
        constraints={{ facingMode: 'environment' }}
        scanDelay={1000}
        onResult={(result, error) => {
          if (result) {
            window.location.href = result.getText();
          }

          if (error?.message) {
            console.info(error?.message);
          }
        }}
        videoStyle={{ objectFit: 'cover' }}
        containerStyle={{ marginTop: '-12px', position: 'relative', height: '100%' }}
        videoContainerStyle={{ height: '100%', paddingTop: 0 }}
        ViewFinder={() => <div className={styles.box} />}
      />
    </Box>
  );
});
