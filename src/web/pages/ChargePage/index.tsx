import { ChargeIndicator } from './ChargeIndicator';
import { PowerIndicator } from './PowerIndicator';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { CrossIcon } from 'icons';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { store } from 'web/application/store';
import { ROUTES } from 'web/constant';

export const ChargePage = observer(() => {
  const [visible, setVisible] = useState(false);
  const { push } = useHistory();

  useEffect(() => {
    store.loadCurrentTransaction();
  }, []);

  useEffect(() => {
    if (store.currentTransactionPromise?.value?.status === 'ACTIVE') {
      setTimeout(() => store.loadCurrentTransaction(), 5000);
    }
  }, [store.currentTransactionPromise?.value]);

  function handleCancel() {
    push(ROUTES.MAIN);
  }

  function handleStart() {
    store.stopTransaction();
  }

  return (
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
            <Typography weight={800} size={24} lineHeight={30} color={COLORS.BLACK} textAlign="center">
              Идёт зарядка батареи
            </Typography>
          </Box>
          <Box marginBottom={-130} height={260} marginTop={16} justifyContent="center" alignItems="center">
            <ChargeIndicator color={COLORS.GREEN} percent={68} time={6} />
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
                34
              </Typography>
              <Typography weight={700} size={18} lineHeight={22} color={COLORS.LIGHT_BLACK}>
                /50
              </Typography>
            </Box>
            <Typography weight={700} size={12} lineHeight={15} color={COLORS.LIGHT_BLACK} textAlign="center">
              kW*h
            </Typography>
          </Box>
          <PowerIndicator />
          <Box width={72}>
            <Typography weight={700} size={18} lineHeight={22} color={COLORS.BLACK} textAlign="center">
              {store.currentTransactionPromise?.value?.amount}
            </Typography>
            <Typography weight={700} size={12} lineHeight={15} color={COLORS.LIGHT_BLACK} textAlign="center">
              BYN
            </Typography>
          </Box>
        </Box>
        <Box marginTop={12} paddingLeft={16} paddingRight={16}>
          <Typography weight={400} size={16} lineHeight={24} color={COLORS.LIGHT_BLACK} textAlign="center">
            Выполняется зарядка
          </Typography>
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
          <Button label="Остановить" onClick={handleStart} loading={store?.currentTransactionPromise?.pending} />
        </Box>
        <Modal onClose={() => setVisible(false)} title="Информация о заправке" visible={visible}>
          <Box marginTop={20}>
            <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
              Время старта
            </Typography>
            <Box marginTop={8}>
              <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
                {store.currentTransactionPromise?.value?.startTime}
              </Typography>
            </Box>
          </Box>
          <Box marginTop={20}>
            <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
              Время завершения
            </Typography>
            <Box marginTop={8}>
              <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
                {store.currentTransactionPromise?.value?.stopTime}
              </Typography>
            </Box>
          </Box>
          <Box marginTop={20}>
            <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
              Сумма
            </Typography>
            <Box marginTop={8}>
              <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
                {store.currentTransactionPromise?.value?.amount}
              </Typography>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
});
