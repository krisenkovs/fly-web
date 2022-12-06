import styles from './styles.module.css';
import { Box, TouchableOpacity, Typography } from 'components';
import { COLORS } from 'constant';
import React, { useEffect, useState } from 'react';

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!localStorage.getItem('cookie'));
  }, []);

  function handleOk() {
    setOpen(false);
    localStorage.setItem('cookie', '1');
  }

  if (!open) return null;

  return (
    <Box
      position="absolute"
      marginLeft={16}
      marginRight={16}
      marginBottom={16}
      className={styles.container}
      backgroundColor={COLORS.BLACK}
      borderRadius={12}
    >
      <Box paddingRight={16} paddingLeft={16} paddingBottom={16} paddingTop={16}>
        <Box flex={1}>
          <Typography color={COLORS.WHITE} size={14} weight={400} lineHeight={18}>
            Сайт использует cookie
          </Typography>
        </Box>
        <Box marginTop={8} flexDirection="row" justifyContent="flex-end">
          <TouchableOpacity onPress={handleOk}>
            <Typography color={COLORS.WHITE} size={16} weight={600} lineHeight={24}>
              Принять
            </Typography>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}
