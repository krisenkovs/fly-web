import { Box } from 'components/Box';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { QrReader } from 'react-qr-reader';
import { Header } from 'web/components/Header';

export const ScannerPage = observer(() => {
  return (
    <Box flex={1} position="relative">
      <Header showProfileButton={false} showBackButton title="Отсканируйте QR код" style={{ zIndex: 1 }} />
      <QrReader
        constraints={{ facingMode: 'environment' }}
        scanDelay={1000}
        onResult={(result, error) => {
          if (result) {
            console.log(result?.getText());
            window.location.href = result.getText();
          }

          if (error?.message) {
            console.info(error?.message);
          }
        }}
        videoStyle={{ objectFit: 'cover' }}
        containerStyle={{ marginTop: '-12px', position: 'relative', height: '100%' }}
        videoContainerStyle={{ height: '100%', paddingTop: 0 }}
        ViewFinder={() => (
          <div
            style={{
              width: '250px',
              height: '250px',
              background: 'rgba(0,0,0,0.2)',
              position: 'absolute',
              overflow: 'hidden',
              top: 'calc(50% - 125px)',
              left: 'calc(50% - 125px)',
              borderRadius: '12px',
              border: '4px solid white',
              zIndex: '1',
            }}
          />
        )}
      />
    </Box>
  );
});
