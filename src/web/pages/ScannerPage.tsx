import { Box } from 'components/Box';
import { COLORS } from 'constant';
import { observer } from 'mobx-react';
import React from 'react';
// @ts-ignore
import QrReader from 'react-qr-scanner';
import { Header } from 'web/components/Header';

export const ScannerPage = observer(() => {
  function handleScan(data: string) {
    console.log(data);
  }
  function handleError(err: unknown) {
    console.error(err);
  }

  return (
    <Box flex={1}>
      <Header showProfileButton={false} showBackButton title="Отсканируйте QR код" />
      <Box flex={1} style={{ position: 'relative' }}>
        <QrReader
          delay={100}
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          onError={handleError}
          onScan={handleScan}
        />
        <Box
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.5,
          }}
        >
          <Box borderRadius={12}>
            <svg width="203" height="200" viewBox="0 0 203 200" fill="none">
              <path
                d="M201 62V22C201 10.9543 192.046 2 181 2H141"
                stroke={`var(--color-blue)`}
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M2 138L2 178C2 189.046 10.9543 198 22 198L62 198"
                stroke={`var(--color-blue)`}
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M2 62V22C2 10.9543 10.9543 2 22 2H62"
                stroke={`var(--color-blue)`}
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M201 138L201 178C201 189.046 192.046 198 181 198L141 198"
                stroke={`var(--color-blue)`}
                strokeWidth="4"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
