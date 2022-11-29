import { ChargeIndicator } from './ChargeIndicator';
import { store as infoModalStore } from './InfoModal/store';
import { PowerIndicator } from './PowerIndicator';
import { store } from './store';
import { Loader } from 'components';
import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { CrossIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'web/constant';
import { ActionButton } from 'web/pages/ChargePage/ActionButton';
import { InfoMessage } from 'web/pages/ChargePage/InfoMessage';
import { InfoModal } from 'web/pages/ChargePage/InfoModal';
import { Title } from 'web/pages/ChargePage/Title';
import { wsService } from 'web/services/WSService';
import { TRANSACTION_STATUS } from 'web/types';

export const ChargePage = observer(() => {
  const { push, replace } = useHistory();
  const {
    currentTransactionPromise,
    loadCurrentTransaction,
    stopTransaction,
    stopTransactionPromise,
    currentTransaction,
    setCurrentTransaction,
  } = store;

  useEffect(() => {
    loadCurrentTransaction();
  }, []);

  useEffect(() => {
    let topic: number;
    if (currentTransactionPromise?.value?.id) {
      topic = wsService.subscribe(`/topic/transaction/${currentTransactionPromise?.value?.id}`, setCurrentTransaction);
    }
    return () => {
      wsService.unsubscribe(topic);
    };
  }, [currentTransactionPromise?.value]);

  useEffect(() => {
    if (
      (!currentTransaction?.id ||
        ![TRANSACTION_STATUS.ACTIVE, TRANSACTION_STATUS.CLOSING, TRANSACTION_STATUS.ACTIVE].includes(
          currentTransaction?.status,
        )) &&
      currentTransactionPromise?.fulfilled
    ) {
      replace(ROUTES.MAIN);
    }
  }, [currentTransactionPromise?.fulfilled, currentTransaction]);

  function handleCancel() {
    push(ROUTES.MAIN);
  }

  const colorIndicator = useMemo(() => {
    switch (currentTransaction?.status) {
      case TRANSACTION_STATUS.STOPPED:
        return COLORS.BLUE;
      case TRANSACTION_STATUS.ERROR:
      case TRANSACTION_STATUS.CREATED:
        return COLORS.RED;
      default:
        return COLORS.GREEN;
    }
  }, [currentTransaction?.status]);

  return !currentTransactionPromise?.value ? (
    <Loader />
  ) : (
    <>
      <Box flex={1} paddingBottom={48} overflow="hidden" position="relative">
        <Box
          height={250}
          backgroundColor={COLORS.PALE_BLUE}
          borderBottomRightRadius={12}
          borderBottomLeftRadius={12}
          paddingTop={16}
        >
          <Box flexDirection="row" justifyContent="flex-end" paddingLeft={16} paddingRight={16}>
            <TouchableOpacity onPress={handleCancel}>
              <Box
                width={44}
                height={44}
                borderRadius={22}
                backgroundColor={COLORS.WHITE}
                alignItems="center"
                justifyContent="center"
              >
                <CrossIcon />
              </Box>
            </TouchableOpacity>
          </Box>
          <Box marginTop={12}>
            <Title status={currentTransaction?.status} />
          </Box>
          <Box marginBottom={-130} height={260} marginTop={16} justifyContent="center" alignItems="center">
            <ChargeIndicator
              color={colorIndicator}
              percent={currentTransaction?.lastEvEnergyPercent || 0}
              time={Math.round((Date.now() - Date.parse(currentTransaction?.startTime || '')) / 60000) || 0}
            />
          </Box>
        </Box>
        <Box
          marginTop={126}
          paddingLeft={28}
          paddingRight={26}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box width={72}>
            <Box flexDirection="row" justifyContent="center">
              <Typography weight={700} size={18} lineHeight={22} color={COLORS.BLACK}>
                {currentTransaction?.finalAmount}
              </Typography>
              {currentTransaction?.initAmount && (
                <Typography weight={700} size={18} lineHeight={22} color={COLORS.LIGHT_BLACK}>
                  /{Math.round((currentTransaction?.initAmount || 0) * 10) / 10}
                </Typography>
              )}
            </Box>
            <Typography weight={700} size={12} lineHeight={15} color={COLORS.LIGHT_BLACK} textAlign="center">
              kW*h
            </Typography>
          </Box>
          <PowerIndicator max={60} value={currentTransaction?.powerImport || 0} color={colorIndicator} />
          <Box width={72}>
            <Typography weight={700} size={18} lineHeight={22} color={COLORS.BLACK} textAlign="center">
              {Math.round((currentTransaction?.finalPrice || 0) * 100) / 100}
            </Typography>
            <Typography weight={700} size={12} lineHeight={15} color={COLORS.LIGHT_BLACK} textAlign="center">
              BYN
            </Typography>
          </Box>
        </Box>
        <Box marginTop={12} paddingLeft={16} paddingRight={16}>
          <InfoMessage
            status={currentTransaction?.status}
            startDate={currentTransaction?.startTime}
            endDate={currentTransaction?.stopTime}
          />
        </Box>
        <Box marginTop={12} paddingLeft={16} paddingRight={16} justifyContent="center" flexDirection="row">
          <TouchableOpacity onPress={() => infoModalStore.show(currentTransaction)}>
            <Typography weight={700} size={16} lineHeight={20} color={COLORS.BLUE} textAlign="center">
              Подробнее о заправке
            </Typography>
          </TouchableOpacity>
        </Box>
        <Box flex={1} />
        <Box paddingLeft={16} paddingRight={16}>
          <ActionButton
            onStart={() => console.log('start')}
            onStop={stopTransaction}
            loading={!!stopTransactionPromise?.pending}
            status={currentTransaction?.status}
          />
        </Box>
        <InfoModal />
      </Box>
    </>
  );
});
