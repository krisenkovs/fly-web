import { StationsSheet } from './StationsSheet';
import { store } from './store';
import styles from './styles.module.css';
import { Box, Pressable, Skeleton, TouchableOpacity, Typography } from 'components';
import { COLORS } from 'constant';
import { BellIcon, CaretRightIcon, FlyIcon, WarningIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { store as mainStore } from 'web/application/store';
import { ROUTES } from 'web/constant';
import { useTranslate } from 'web/helpers/useTranslate';

export const MainPage = observer(() => {
  const [height, setHeight] = useState<number | undefined>(0);
  const ref = useRef<HTMLDivElement>(null);

  const { push } = useHistory();

  const { loadCurrentTransaction, currentTransactionPromise, loadStations, clear } = store;
  const t = useTranslate(mainStore.translate);

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

  function handleTransaction() {
    push(`${ROUTES.CHARGE}`);
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
                  {mainStore.profilePromise?.value?.firstName}
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

        <Box height={188} marginTop={100} position='relative'>
          <img src="images/waves.png" alt="" className={styles.image} />
          <Box className={styles.scannerButtonContainer}>
            <TouchableOpacity className={styles.scannerButton} onPress={handleScannerPress}>
              <FlyIcon />
            </TouchableOpacity>
          </Box>
        </Box>
        <Box marginTop={44} marginLeft={16} marginRight={16} height={60} marginBottom={40}>
          {currentTransactionPromise?.value?.status === 'ACTIVE' ? (
            <Pressable onPress={handleTransaction}>
              <Box
                paddingTop={18}
                paddingBottom={18}
                flexDirection="row"
                backgroundColor={COLORS.LIGHT_BLUE}
                borderRadius={12}
                paddingLeft={18}
                paddingRight={18}
                alignItems="center"
              >
                <WarningIcon />
                <Box flex={1} marginLeft={14} marginRight={14}>
                  <Typography color={COLORS.BLACK} weight={700} size={16} lineHeight={20}>
                    Идет зарядка
                  </Typography>
                </Box>
                <CaretRightIcon color={COLORS.BLUE} width={24} height={24} />
              </Box>
            </Pressable>
          ) : (
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK} textAlign="center">
              Отсканируйте QR код на заправочной станции
            </Typography>
          )}
        </Box>
        <Box flex={1} refContainer={ref} />
        {!!height && <StationsSheet height={height} />}
      </Box>
    </>
  );
});
