import styles from './styles.module.css';
import { Box, TouchableOpacity, Typography } from 'components';
import { COLORS } from 'constant';
import { PlusIcon, VisaIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { store as mainStore } from 'web/application/store';
import { store } from 'web/components/CardView/store';

export const CardView = observer(function () {
  const { cardPromise, loadCard } = mainStore;
  const { tieCard, tieCardPromise, destroy } = store;

  useEffect(() => {
    return destroy;
  }, []);

  useEffect(() => {
    if (tieCardPromise?.fulfilled) {
      if (tieCardPromise.value?.redirectUrl) {
        window.location.replace(tieCardPromise.value?.redirectUrl);
      } else {
        loadCard();
      }
    }
  }, [tieCardPromise?.fulfilled]);

  function handleAddPress() {
    tieCard(window.location.href);
  }

  if (!cardPromise?.fulfilled) {
    return null;
  }

  return cardPromise?.value ? (
    <Box
      backgroundColor={COLORS.PALE_BLUE}
      height={80}
      boxSizing="border-box"
      borderRadius={8}
      paddingTop={16}
      paddingLeft={12}
      paddingRight={12}
      paddingBottom={16}
      className={styles.container}
    >
      <Box alignItems="center" flex={1} flexDirection="row">
        <VisaIcon />
        <Box flex={1} marginLeft={12} marginRight={12}>
          <Typography color={COLORS.BLACK} weight={700} size={14} lineHeight={18}>
            {`•••• ${cardPromise?.value?.last4}`}
          </Typography>
        </Box>
        <Typography color={COLORS.BLACK} weight={400} size={14} lineHeight={18}>
          {`${cardPromise?.value?.expMonth}/${cardPromise?.value?.expYear}`}
        </Typography>
      </Box>
      <Box flex={1} />
    </Box>
  ) : (
    <TouchableOpacity onPress={handleAddPress} disabled={tieCardPromise?.pending}>
      <Box
        backgroundColor={COLORS.PALE_BLUE}
        height={80}
        boxSizing="border-box"
        borderRadius={8}
        paddingTop={16}
        paddingLeft={12}
        paddingRight={12}
        paddingBottom={16}
        className={styles.container}
        alignItems="center"
        justifyContent="center"
      >
        <Box flexDirection="row" alignItems="center">
          <PlusIcon />
          <Box marginLeft={8}>
            <Typography color={COLORS.BLUE} weight={600} size={14} lineHeight={18}>
              Добавить карту для оплаты
            </Typography>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
});
