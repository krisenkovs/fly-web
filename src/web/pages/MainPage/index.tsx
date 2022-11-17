import { StationsSheet } from './StationsSheet';
import { store } from './store';
import styles from './styles.module.css';
import { Box, Skeleton, TouchableOpacity, Typography } from 'components';
import { COLORS } from 'constant';
import { BellIcon, FlyIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslate } from 'web/application/TranslateProvider';
import { store as mainStore } from 'web/application/store';
import { ROUTES } from 'web/constant';
import { Transaction } from 'web/pages/MainPage/Transaction';

export const MainPage = observer(() => {
  const [height, setHeight] = useState<number | undefined>(0);
  const ref = useRef<HTMLDivElement>(null);

  const { push } = useHistory();

  const { loadCurrentTransaction, currentTransactionPromise, loadStations, clear } = store;
  const t = useTranslate();

  useEffect(() => {
    ref?.current && setHeight(ref?.current?.clientHeight);
  }, [ref.current]);

  useEffect(() => {
    loadCurrentTransaction();
    loadStations();
    return clear;
  }, []);

  useEffect(() => {
    if (currentTransactionPromise?.value?.status === 'ACTIVE') {
      setTimeout(() => loadCurrentTransaction(), 5000);
    }
  }, [currentTransactionPromise?.value]);

  function handleScannerPress() {
    push(ROUTES.SCANNER);
  }

  function handleUserPress() {
    push(ROUTES.PROFILE);
  }

  function handleNotificationPress() {
    push(ROUTES.NOTIFICATION);
  }

  return (
    <>
      <Box flex={1} position="relative">
        <Box
          paddingLeft={16}
          paddingRight={16}
          paddingTop={24}
          paddingBottom={24}
          alignItems="center"
          flexDirection="row"
        >
          {mainStore.profilePromise?.pending ? (
            <Skeleton.Avatar size={48} />
          ) : (
            <TouchableOpacity onPress={handleUserPress}>
              <Box
                width={48}
                height={48}
                borderRadius={24}
                justifyContent="center"
                alignItems="center"
                backgroundColor={COLORS.PALE_BLUE}
              >
                <Typography weight={700} size={18} lineHeight={18} color={COLORS.BLUE}>
                  {mainStore.profilePromise?.value?.firstName?.substr(0, 1).toUpperCase()}
                </Typography>
              </Box>
            </TouchableOpacity>
          )}
          {mainStore.profilePromise?.pending ? (
            <Box marginLeft={12} flex={1}>
              <Skeleton.Row height={40} />
            </Box>
          ) : (
            <>
              <Box marginLeft={12} flex={1} flexDirection="column">
                <Typography weight={800} size={20} lineHeight={25} color={COLORS.BLACK}>
                  {`${mainStore.profilePromise?.value?.firstName || ''} ${
                    mainStore.profilePromise?.value?.lastName || ''
                  }`}
                </Typography>
                <Typography weight={400} size={12} lineHeight={15} color={COLORS.LIGHT_BLACK}>
                  {t('mainPage.welcome')}
                </Typography>
              </Box>
              <TouchableOpacity onPress={handleNotificationPress}>
                <Box width={40} height={40} borderRadius={20} backgroundColor={COLORS.WHITE}>
                  <BellIcon width={32} height={32} />
                </Box>
              </TouchableOpacity>
            </>
          )}
        </Box>

        <Box height={188} marginTop={100} position="relative">
          <img src="images/waves.png" alt="" className={styles.image} />
          <Box className={styles.scannerButtonContainer}>
            <TouchableOpacity className={styles.scannerButton} onPress={handleScannerPress}>
              <FlyIcon />
            </TouchableOpacity>
          </Box>
        </Box>
        <Box marginTop={44} marginLeft={16} marginRight={16} height={60} marginBottom={40}>
          <Transaction />
        </Box>
        <Box flex={1} refContainer={ref} />
        {!!height && <StationsSheet height={height} />}
      </Box>
    </>
  );
});
