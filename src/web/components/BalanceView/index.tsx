import styles from './styles.module.css';
import { Box, TouchableOpacity, Typography } from 'components';
import { COLORS } from 'constant';
import { BalanceIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { store as mainStore } from 'web/application/store';
import { ROUTES } from 'web/constant';

export const BalanceView = observer(function () {
  const { accountPromise } = mainStore;
  const { replace, location } = useHistory();

  function handleUp() {
    replace(`${ROUTES.BALANCE}?redirect=${location.pathname}`);
  }

  return (
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
        <BalanceIcon />
        <Box flex={1} marginLeft={12} marginRight={12}>
          <Typography color={COLORS.BLACK} weight={700} size={14} lineHeight={18}>
            Мой баланс
          </Typography>
        </Box>
        <Typography color={COLORS.BLACK} weight={400} size={14} lineHeight={18}>
          {`${accountPromise?.value?.amount?.toFixed(2) || 0} BYN`}
        </Typography>
      </Box>
      <Box marginTop={8} marginLeft={52}>
        <TouchableOpacity onPress={handleUp}>
          <Typography color={COLORS.BLUE} size={14} weight={400} lineHeight={18}>
            Пополнить баланс
          </Typography>
        </TouchableOpacity>
      </Box>
    </Box>
  );
});
