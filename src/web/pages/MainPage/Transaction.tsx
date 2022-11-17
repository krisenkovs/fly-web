import { store } from './store';
import { Box, Pressable, Typography } from 'components';
import { COLORS } from 'constant';
import { CaretRightIcon, WarningIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'web/constant';
import { TRANSACTION_STATUS } from 'web/types';

export const Transaction = observer(() => {
  const { push } = useHistory();
  const { currentTransactionPromise } = store;

  function handleTransaction() {
    push(`${ROUTES.CHARGE}`);
  }

  if (currentTransactionPromise?.value?.status === TRANSACTION_STATUS.ACTIVE) {
    return (
      <Pressable onPress={handleTransaction}>
        <Box
          paddingTop={18}
          paddingBottom={18}
          flexDirection="row"
          backgroundColor={COLORS.BG_GREEN}
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
    );
  }

  if (currentTransactionPromise?.value?.status === TRANSACTION_STATUS.CLOSING) {
    return (
      <Pressable onPress={handleTransaction}>
        <Box
          paddingTop={18}
          paddingBottom={18}
          flexDirection="row"
          backgroundColor={COLORS.BG_GREEN}
          borderRadius={12}
          paddingLeft={18}
          paddingRight={18}
          alignItems="center"
        >
          <WarningIcon />
          <Box flex={1} marginLeft={14} marginRight={14}>
            <Typography color={COLORS.BLACK} weight={700} size={16} lineHeight={20}>
              Завершение зарядки
            </Typography>
          </Box>
          <CaretRightIcon color={COLORS.BLUE} width={24} height={24} />
        </Box>
      </Pressable>
    );
  }

  return (
    <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK} textAlign="center">
      Отсканируйте QR код на заправочной станции
    </Typography>
  );
});
