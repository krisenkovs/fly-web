import styles from './styles.module.css';
import { Box, TouchableOpacity, Typography } from 'components';
import { COLORS } from 'constant';
import React, { useEffect, useMemo, useState } from 'react';

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!localStorage.getItem('cookie'));
  }, []);

  function handleOk() {
    setOpen(false);
    localStorage.setItem('cookie', '1');
  }

  function handleCancel() {
    setOpen(false);
    localStorage.setItem('cookie', '0');
  }

  const contentStyle = useMemo(() => {
    return { transform: open ? 'translateY(0)' : 'translateY(100%)' };
  }, [open]);

  if (!open) return null;

  return (
    <Box position="absolute" className={styles.container} backgroundColor={COLORS.WHITE} style={contentStyle}>
      <Box paddingRight={16} paddingLeft={16} paddingBottom={24} paddingTop={24}>
        <Box flex={1}>
          <Typography color={COLORS.BLACK} size={14} weight={400} lineHeight={18}>
            Мы используем cookie файлы для наилучшей работы нашего сервиса. Используя сервис вы даёте согласие на работу
            с этими файлами.
          </Typography>
        </Box>
        <Box marginTop={20}>
          <TouchableOpacity onPress={handleOk}>
            <Box
              paddingTop={10}
              paddingBottom={10}
              backgroundColor={COLORS.BLUE}
              justifyContent="center"
              alignItems="center"
              borderRadius={8}
            >
              <Typography color={COLORS.WHITE} size={14} weight={700} lineHeight={18}>
                Принять
              </Typography>
            </Box>
          </TouchableOpacity>
          <Box marginTop={8} justifyContent="center" alignItems="center">
            <TouchableOpacity onPress={handleCancel}>
              <Typography color={COLORS.BLUE} size={14} weight={700} lineHeight={18}>
                Отказаться
              </Typography>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
