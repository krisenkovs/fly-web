import { useStation } from 'web/helpers/useStation';
import { ChargeIndicator } from './ChargeIndicator';
import { PowerIndicator } from './PowerIndicator';
import { Loader } from 'components';
import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { CrossIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { store } from 'web/application/store';
import { ROUTES } from 'web/constant';
import { formatDateTime } from 'web/helpers/formatter';
import { ActionButton } from 'web/pages/ChargePage/ActionButton';
import { InfoMessage } from 'web/pages/ChargePage/InfoMessage';
import { InfoModal } from 'web/pages/ChargePage/InfoModal';
import { Title } from 'web/pages/ChargePage/Title';
import { TRANSACTION_STATUS } from 'web/types';

export const ChargePage = observer(() => {
  const [visible, setVisible] = useState(false);
  const { push, replace } = useHistory();
  const { currentTransactionPromise, loadCurrentTransaction, stopTransaction } = store;

  useEffect(() => {
    loadCurrentTransaction();
    const interval = setInterval(() => loadCurrentTransaction(), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!currentTransactionPromise?.value?.id && currentTransactionPromise?.fulfilled) {
      replace(ROUTES.MAIN);
    }
  }, [currentTransactionPromise?.fulfilled]);

  const station = useStation(currentTransactionPromise?.value?.chargeStationId);

  const power = useMemo(() => {
    return (
      (currentTransactionPromise?.value?.currentEnergyImport || 0) -
      (currentTransactionPromise?.value?.startEnergyImport || 0)
    );
  }, [currentTransactionPromise?.value]);

  function handleCancel() {
    push(ROUTES.MAIN);
  }

  function handleCloseModal() {
    setVisible(false);
  }

  const colorIndicator = useMemo(() => {
    switch (currentTransactionPromise?.value?.status) {
      case TRANSACTION_STATUS.STOPPED:
        return COLORS.BLUE;
      case TRANSACTION_STATUS.ERROR:
      case TRANSACTION_STATUS.CREATED:
        return COLORS.RED;
      default:
        return COLORS.GREEN;
    }
  }, [currentTransactionPromise?.value?.status]);

  return !currentTransactionPromise?.value ? (
    <Loader />
  ) : (
    <>
      <Box flex={1} paddingBottom={48} overflow="hidden" style={{ position: 'relative' }}>
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
            <Title status={currentTransactionPromise?.value?.status} />
          </Box>
          <Box marginBottom={-130} height={260} marginTop={16} justifyContent="center" alignItems="center">
            <ChargeIndicator
              color={colorIndicator}
              percent={currentTransactionPromise?.value?.lastEvEnergyPercent || 0}
              time={
                Math.round((Date.now() - Date.parse(currentTransactionPromise?.value?.startTime || '')) / 60000) || 0
              }
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
                {power}
              </Typography>
              <Typography weight={700} size={18} lineHeight={22} color={COLORS.LIGHT_BLACK}>
                /{currentTransactionPromise?.value?.initAmount}
              </Typography>
            </Box>
            <Typography weight={700} size={12} lineHeight={15} color={COLORS.LIGHT_BLACK} textAlign="center">
              kW*h
            </Typography>
          </Box>
          <PowerIndicator max={60} value={currentTransactionPromise?.value?.powerImport || 0} color={colorIndicator} />
          <Box width={72}>
            <Typography weight={700} size={18} lineHeight={22} color={COLORS.BLACK} textAlign="center">
              {Math.round(power * (station?.rate || 0))}
            </Typography>
            <Typography weight={700} size={12} lineHeight={15} color={COLORS.LIGHT_BLACK} textAlign="center">
              BYN
            </Typography>
          </Box>
        </Box>
        <Box marginTop={12} paddingLeft={16} paddingRight={16}>
          <InfoMessage status={currentTransactionPromise?.value?.status} />
        </Box>
        <Box marginTop={12} paddingLeft={16} paddingRight={16} justifyContent="center" flexDirection="row">
          <TouchableOpacity onPress={() => setVisible(true)}>
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
            loading={currentTransactionPromise?.pending}
            status={currentTransactionPromise?.value?.status}
          />
        </Box>
        <InfoModal
          visible={visible}
          onClose={handleCloseModal}
          startDate={formatDateTime(currentTransactionPromise?.value?.startTime)}
          endDate={formatDateTime(currentTransactionPromise?.value?.stopTime)}
          power={power}
          sum={Math.round(power * (station?.rate || 0))}
          address={station?.address}
        />
      </Box>
    </>
  );
});
